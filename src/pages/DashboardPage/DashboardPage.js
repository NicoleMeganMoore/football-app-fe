import React, { Component } from "react";
import { Query } from "react-apollo";

// Lodash
import _get from "lodash/get";

// Material
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

import { USER_QUERY } from "../../graphql/queries";
import { LeagueTile } from "../../components/LeagueTile";

import "./DashboardPage.scss";

class DashboardPage extends Component {
  renderActiveLeagueList = (data, refetch, loading) => {
    const leaguesList = _get(data, "user.leagues");
    const isDraftDay = _get(data, "currentDetails.is_draft_day");
    const nextDraftDay = _get(data, "currentDetails.next_draft_day");

    if (_get(leaguesList, "length")) {
      return leaguesList.map(league => {
        return (
          <LeagueTile
            league={league}
            isDraftDay={isDraftDay}
            nextDraftDay={nextDraftDay}
            loading={loading}
            refetch={refetch}
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
            {loading && (
              <div className="loading-container" style={{ height: "80vh" }}>
                <CircularProgress />
              </div>
            )}
            {_get(data, "currentDetails") && (
              <div className="start-league-btn-container">
                <h2>Week {_get(data, "currentDetails.current_week")}</h2>
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  onClick={this.props.navigateToLeagues}
                >
                  <AddIcon />
                </Fab>
              </div>
            )}
            {_get(data, "user.leagues") &&
              this.renderActiveLeagueList(data, refetch, loading)}
          </div>
        )}
      </Query>
    );
  };
}

export default DashboardPage;
