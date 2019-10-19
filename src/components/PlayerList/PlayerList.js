import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";

// Material UI
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

// lodash
import _get from "lodash/get";
import _find from "lodash/find";
import _sortBy from "lodash/sortBy";
import _filter from "lodash/filter";

import { Query } from "react-apollo";
import { PLAYERS_QUERY, USER_QUERY } from "../../graphql/queries";
import { getSeasonPointTotal } from "../../js/util";
import placeholderImage from "../../images/img-placeholder.jpg";

import "react-table/react-table.css";
import "./PlayerList.scss";

class PlayerList extends React.Component {
  static propTypes = {
    playerList: PropTypes.arrayOf(PropTypes.shape({}))
  };

  static defaultProps = {
    playerList: []
  };

  state = {
    filterInput: ""
  };

  filterData = (playerList, activeLeague) => {
    const gamesPlayedFiltered = this.filterDataByGamesPlayed(playerList);
    const hasTeamFiltered = this.filterDataByHasTeam(gamesPlayedFiltered);
    const searchInputFiltered = this.filterDataBySearchInput(hasTeamFiltered);

    // Finally, sort player list by points calculated from league settings (descending)
    const leagueSettings = activeLeague ? activeLeague.settings : null;
    const sortedPlayerList = _sortBy(
      searchInputFiltered,
      player =>
        getSeasonPointTotal(_get(player, "season_stats"), leagueSettings) * -1
    );

    return sortedPlayerList;
  };

  filterDataByHasTeam = playerList => {
    return _filter(playerList, player => {
      return !!_get(player, "team_id");
    });
  };

  filterDataByGamesPlayed = playerList => {
    return _filter(playerList, player => {
      const teamsToPlay =
        _get(this.props.currentDetails, "teams_to_play") || [];
      return teamsToPlay.includes(_get(player, "team_id"));
    });
  };

  filterDataBySearchInput = playerList => {
    if (!this.state.filterInput) {
      return playerList;
    }
    const lowerCaseFilterInput = this.state.filterInput.toLowerCase();
    return _filter(playerList, player => {
      const fullNameLowerCase = `${player.first_name.toLowerCase()} ${player.last_name.toLowerCase()}`;
      return fullNameLowerCase.includes(lowerCaseFilterInput);
    });
  };

  render = () => {
    return (
      <Query query={USER_QUERY}>
        {({ loading: usserLoading, data: userData, error: userError }) => (
          <Query query={PLAYERS_QUERY}>
            {({ loading, data, error }) => {
              if (error) {
                return "error";
              }

              const playerList = _get(data, "players", []);

              const activeLeague = _find(
                _get(userData, "user.leagues", []),
                league => league.id === Number(this.props.leagueId)
              );

              return (
                <Paper className="">
                  <div className="player-search-input-container">
                    <Input
                      className="player-search-input"
                      placeholder="Search by player name"
                      onChange={e =>
                        this.setState({ filterInput: e.target.value })
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </div>
                  <div className="" style={{ overflowX: "auto" }}>
                    <ReactTable
                      className="player-list-table"
                      columns={[
                        {
                          Header: undefined,
                          accessor: "image_url",
                          width: 100,
                          Cell: props => (
                            <Avatar
                              src={props.value || placeholderImage}
                              className="player-avatar"
                            />
                          )
                        },
                        {
                          Header: "Full Name",
                          id: "full_name",
                          accessor: d => [d.first_name, d.last_name],
                          Cell: props => {
                            return `${props.value[0]} ${props.value[1]}`;
                          }
                        },
                        {
                          Header: "Position",
                          accessor: "position"
                        },
                        {
                          Header: "Team",
                          accessor: "team_abbrv"
                        },
                        {
                          Header: "Total Points",
                          id: "total-points",
                          accessor: "season_stats",
                          Cell: props => {
                            return (
                              <span>
                                {getSeasonPointTotal(
                                  props.value,
                                  activeLeague ? activeLeague.settings : {}
                                )}
                              </span>
                            );
                          }
                        }
                      ]}
                      data={this.filterData(playerList, activeLeague)}
                      defaultPageSize={6}
                      noDataText="Loading..."
                      showPageSizeOptions={false}
                      getTdProps={(state, rowInfo, column, instance) => {
                        return {
                          onClick: (e, handleOriginal) => {
                            this.props.onRowClick(_get(rowInfo, "original.id"));
                            // console.log(_get(rowInfo, "original.season_stats"));
                            if (handleOriginal) {
                              handleOriginal();
                            }
                          }
                        };
                      }}
                    />
                  </div>
                </Paper>
              );
            }}
          </Query>
        )}
      </Query>
    );
  };
}

export default PlayerList;
