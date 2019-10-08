import React, { Component } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";
import { Query } from "react-apollo";

// Lodash
import _get from "lodash/get";

// Material
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

import { USER_QUERY } from "../../graphql/queries";
import { LeagueTile } from "../../components/LeagueTile";

import {
  getIsFetchingSeasonDetails,
  getNextDraftDay,
  getCurrentWeek,
  getIsDraftDay
} from "../../redux/rootReducer";

import { navigateToLeagues } from "../../redux/modules/location";

import "./DashboardPage.scss";

class DashboardPage extends Component {
  componentDidMount = () => {
    // const handlers = {
    //   next: data => {
    //     console.log(`received data:`, data);
    //     if (data.data.info === "done") {
    //       console.log("exiting...");
    //       process.exit(0);
    //     }
    //   },
    //   error: error => console.error(`received error ${error}`)
    // };
    // const query = `subscription {
    //   leagueAdded {
    //     id
    //     league_name
    //   }
    // }`;
    // subscribe(query, handlers);
  };

  renderActiveLeagueList = data => {
    const leaguesList = _get(data, "user.leagues");

    if (_get(leaguesList, "length")) {
      return leaguesList.map(league => {
        return (
          <LeagueTile
            league={league}
            isDraftDay={this.props.isDraftDay}
            nextDraftDay={this.props.nextDraftDay}
          />
        );
      });
    }

    return "You aren't part of any leagues!";
  };

  render = () => {
    return (
      <Query query={USER_QUERY}>
        {({ loading, error, data, refetch, networkStatus }) => (
          <div className="dashboard-page">
            {
              // If no leagues
              // Show button to start league and invite a friend
              // Start a head to head league. You can start a league any time and choose
              // the weeks you want to play
            }
            <div className="start-league-btn-container">
              <h2>Week {this.props.currentWeek}</h2>
              {
                // <Button
                //   className="start-league-btn"
                //   variant="contained"
                //   color="secondary"
                // >
                //
                // </Button>
              }

              <Fab
                color="primary"
                aria-label="add"
                size="small"
                // variant="extended"
                onClick={this.props.navigateToLeagues}
              >
                <AddIcon
                // className="start-league-btn-icon"
                />
              </Fab>
            </div>
            {loading && (
              <div className="loading-container">
                <CircularProgress />
              </div>
            )}
            {_get(data, "user.leagues") &&
              this.renderActiveLeagueList(data, refetch)}
          </div>
        )}
      </Query>
    );
  };
}

const mapStateToProps = state => ({
  currentWeek: getCurrentWeek(state),
  isDraftDay: getIsDraftDay(state),
  nextDraftDay: getNextDraftDay(state),
  isFetchingSeasonDetails: getIsFetchingSeasonDetails(state)
});

export default connect(
  mapStateToProps,
  {
    signInUser,
    signOutUser,
    navigateToLeagues
  }
)(DashboardPage);
