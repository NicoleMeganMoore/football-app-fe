import React, { Component } from "react";
import { connect } from "react-redux";
import { Mutation, Query } from "react-apollo";
import _get from "lodash/get";
import _find from "lodash/find";
import CountDown from "react-countdown-now";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

// Material UI
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

import { LEAGUE_QUERY, USER_QUERY, PLAYERS_QUERY } from "../../graphql/queries";
import { START_DRAFT_MUTATION } from "../../graphql/mutations";
import { DRAFT_UPDATED_SUBSCRIPTION } from "../../graphql/subscriptions";
import placeholderImage from "../../images/img-placeholder.jpg";
import { positionNames } from "../../js/constants";

import { PlayerList } from "../../components/PlayerList";

import "./DraftPage.scss";
import moment from "moment";

class DraftPage extends Component {
  state = {
    nextTurn: moment().add(90, "seconds"),
    activePlayerId: null
  };
  componentDidMount = () => {};

  renderActivePlayerSummary = playerId => {
    return (
      <Query query={PLAYERS_QUERY}>
        {({ loading, data, error }) => {
          const players = _get(data, "players", []);
          const activePlayer = _find(players, player => player.id === playerId);
          console.log(activePlayer);
          if (!activePlayer) {
            return null;
          }
          return (
            <div className="summary-container">
              <Avatar
                src={activePlayer.image_url || placeholderImage}
                className="summary-player-avatar"
              />
              <div style={{ marginLeft: "20px" }}>
                <div className="summary-player-name">
                  {activePlayer.first_name} {activePlayer.last_name}
                </div>
                <div className="summary-player-desc">
                  {positionNames[activePlayer.position]}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  };

  renderTeams = () => {
    return (
      <Paper className="drafted-teams-container">Drafted teams go here</Paper>
    );
  };

  renderActiveDraft = (data, user) => {
    const firstPlayer = _get(data, "league.draftStatus.firstPlayer");
    const activePlayer = _get(data, "league.draftStatus.activePlayer");
    const league = _get(data, "league");

    if (!firstPlayer) {
      return <div>Determine first player!</div>;
    }
    if (firstPlayer && !activePlayer) {
      return (
        <Mutation mutation={START_DRAFT_MUTATION}>
          {mutate => (
            <div>
              The player who gets to go first is.......
              {firstPlayer.email === _get(user, "user.email")
                ? "YOU!"
                : firstPlayer.email}
              {_get(user, "user.email") === firstPlayer.email && (
                <div>
                  <Button
                    color="primary"
                    onClick={() =>
                      mutate({
                        variables: { leagueId: _get(data, "league.id") }
                      })
                    }
                  >
                    Click here
                  </Button>{" "}
                  to make your first pick
                </div>
              )}
            </div>
          )}
        </Mutation>
      );
    } else if (activePlayer) {
      const activePlayerNameText =
        activePlayer.email === _get(user, "user.email")
          ? "You are"
          : `${activePlayer.first_name} ${activePlayer.last_name} is`;
      return (
        <div>
          <div className="draft-top-container">
            <div className="draft-top-left-container">
              <CountDown
                date={this.state.nextTurn}
                zeroPadTime={2}
                renderer={({ formatted, total }) => {
                  const secondsLeft = total / 1000;

                  let color = "#8c8c8c";
                  if (activePlayer.email === _get(user, "user.email")) {
                    color = "green";
                    if (secondsLeft <= 10) {
                      color = "red";
                    } else if (secondsLeft <= 30) {
                      color = "#f7ce00";
                    }
                  }

                  return (
                    <div
                      className="draft-turn-countdown"
                      style={{ color: color }}
                    >{`${formatted.minutes}:${formatted.seconds}`}</div>
                  );
                }}
              />
              <div className="round-text-container">
                Round {_get(league, "draftStatus.roundNumber")}
              </div>
            </div>
            <div className="draft-top-right-container">
              <div className="selected-player-details">
                {this.state.activePlayerId ? (
                  this.renderActivePlayerSummary(this.state.activePlayerId)
                ) : (
                  <div className="active-player-placeholder">
                    Select a player to see more stats
                  </div>
                )}
              </div>
            </div>
          </div>
          <PlayerList
            leagueId={this.props.params.leagueId}
            onRowClick={id => this.setState({ activePlayerId: id })}
          />
          {this.renderTeams()}
        </div>
      );
    } else if (activePlayer) {
      return (
        <div>
          {activePlayer.first_name} is taking their turn. They have however many
          minutes left
        </div>
      );
    }
    return JSON.stringify(_get(data, "league.draftStatus"));
  };

  renderDraftContent = ({
    loading,
    error,
    data,
    queryLoading,
    queryData,
    queryError,
    userData
  }) => {
    if (queryLoading) {
      return (
        <div className="loading-container">
          <CircularProgress />
        </div>
      );
    } else if (_get(queryData, "league.draftStatus.draftInProgress")) {
      // ready to draft but still initial subscription state
      return this.renderActiveDraft(queryData, userData);
      // } else if (_get(draftStatus, "draftInProgress")) {
      //   return renderActiveDraft(data);
      // } else if (_get(data, "readyToDraft")) {
      //   // not the initial subscription state, display subscription data from now on
      //   return <div className="loading-container">Waiting for all players...</div>;
    } else if (_get(queryData, "league")) {
      return (
        <div className="loading-container">Waiting for all players...</div>
      );
    } else if (queryError) {
      return JSON.stringify(error);
    }

    return "something went wrong and there was nothing to return from the subscription";
  };

  Draft = ({ leagueId }) => {
    return (
      <Query query={USER_QUERY}>
        {({ loading: userLoading, data: userData, error: userError }) => (
          <Query query={LEAGUE_QUERY} variables={{ league_id: leagueId }}>
            {props => {
              const {
                loading: queryLoading,
                data: queryData,
                error: queryError,
                subscribeToMore
              } = props;
              subscribeToMore({
                document: DRAFT_UPDATED_SUBSCRIPTION,
                variables: { leagueId: leagueId },
                updateQuery: (prev, data) => {
                  if (!data) {
                    return prev;
                  }
                }
              });
              return (
                <div>
                  {this.renderDraftContent({
                    userData,
                    queryLoading,
                    queryData,
                    queryError
                  })}
                </div>
              );
            }}
          </Query>
        )}
      </Query>
    );
  };

  render = () => {
    const hasDraftAvailable = true;
    const leagueId = _get(this.props, "params.leagueId");

    if (leagueId) {
      return this.Draft({ leagueId: Number(leagueId) });
    }

    return (
      <div className="draft-page">
        {hasDraftAvailable ? (
          <div>Pick a league to start!</div>
        ) : (
          <div>
            You don't have any leagues that need a draft.{" "}
            <u>Start a new league?</u>
          </div>
        )}
      </div>
    );
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(DraftPage);
