import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import ReactTable from "react-table";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import _get from "lodash/get";
import _sum from "lodash/sum";
import _find from "lodash/find";
import _sortBy from "lodash/sortBy";
import _filter from "lodash/filter";
import _round from "lodash/round";
import { Query } from "react-apollo";
import { PLAYERS_QUERY, USER_QUERY } from "../../graphql/queries";
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

  getSeasonPointTotal = (stats, settings) => {
    if (!settings || !stats) {
      return 0;
    }

    const pointArray = [];
    pointArray.push(stats.fumble * settings.pts_per_fumble);
    pointArray.push(stats.passing_int * settings.pts_per_passing_int);
    pointArray.push(stats.passing_td * settings.pts_per_passing_td);
    pointArray.push(stats.passing_yd * settings.pts_per_passing_yd);
    pointArray.push(stats.receiving_td * settings.pts_per_receiving_td);
    pointArray.push(stats.receiving_yd * settings.pts_per_receiving_yd);
    pointArray.push(stats.reception * settings.pts_per_reception);
    pointArray.push(stats.return_td * settings.pts_per_return_td);
    pointArray.push(stats.rushing_td * settings.pts_per_rushing_td);
    pointArray.push(stats.rushing_yd * settings.pts_per_rushing_yd);
    pointArray.push(stats.two_pt_made);

    const sum = _round(_sum(pointArray), 2);
    return sum;
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
        this.getSeasonPointTotal(_get(player, "season_stats"), leagueSettings) *
        -1
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
      // return !_get(this.props.currentDetails, 'teams_played', []).includes(_get(player, "team_id"));
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
                      // label="Search by player name"
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
                          // Header: "Image",
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
                          // filterable: true,
                          Cell: props => {
                            return `${props.value[0]} ${props.value[1]}`;
                          }
                          // filterMethod: (filter, row, column) => {
                          //   const fullName = row.full_name.join(" ").toLowerCase();
                          //   return fullName.includes(filter.value);
                          // }
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
                                {this.getSeasonPointTotal(
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
