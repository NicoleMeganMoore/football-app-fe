import React, { Component } from "react";
import { connect } from "react-redux";
import { Subscription, Query } from "react-apollo";

import Button from "@material-ui/core/Button";
import _get from "lodash/get";

import { LEAGUE_QUERY, USER_QUERY } from "../../graphql/queries";
import { DRAFT_UPDATED_SUBSCRIPTION } from "../../graphql/subscriptions";

import "./DraftPage.css";
import { CircularProgress } from "@material-ui/core";

class DraftPage extends Component {
  componentDidMount = () => {};

  render = () => {
    const hasDraftAvailable = true;
    const leagueId = _get(this.props, "params.leagueId");

    if (leagueId) {
      return <Draft leagueId={Number(leagueId)} />;
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

const renderActiveDraft = (data, user) => {
  const firstPlayer = _get(data, "league.draftStatus.firstPlayer");
  const activePlayer = _get(data, "league.draftStatus.activePlayer");
  if (!activePlayer) {
    return (
      // <Mutation mutation={START_DRAFT_MUTATION}>
      // </Mutation>
      <div>
        The player who gets to go first is.......
        {firstPlayer.email === _get(user, "user.email")
          ? "YOU!"
          : firstPlayer.email}
        {_get(user, "user.email") === firstPlayer.email && (
          <div>
            <Button color="primary" onClick={() => {}}>
              Click here
            </Button>{" "}
            to make your first pick
          </div>
        )}
      </div>
    );
  } else if (activePlayer && activePlayer.email === _get(user, "user.email")) {
    return <div>It's your turn!! Who you gon pick?</div>;
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

const renderDraftContent = ({
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
    return renderActiveDraft(queryData, userData);
    // } else if (_get(draftStatus, "draftInProgress")) {
    //   return renderActiveDraft(data);
    // } else if (_get(data, "readyToDraft")) {
    //   // not the initial subscription state, display subscription data from now on
    //   return <div className="loading-container">Waiting for all players...</div>;
  } else if (_get(queryData, "league")) {
    return <div className="loading-container">Waiting for all players...</div>;
  } else if (queryError) {
    return JSON.stringify(error);
  }

  return "something went wrong and there was nothing to return from the subscription";
};

const Draft = ({ leagueId }) => {
  return (
    <Query query={USER_QUERY}>
      {({ loading: userLoading, data: userData, error: userError }) => (
        <Query query={LEAGUE_QUERY} variables={{ league_id: leagueId }}>
          {({
            loading: queryLoading,
            data: queryData,
            error: queryError,
            subscribeToMore
          }) => {
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
                {renderDraftContent({
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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(DraftPage);
