import React, { Component, Fragment } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";
import _get from "lodash/get";
import _find from "lodash/find";

import { DraftNowButton } from "../../components/DraftNowButton";

import {
  getLeagues,
  getIsCreatingLeague,
  getIsFetchingUser,
  getCurrentWeek,
  getIsDraftDay
  // getIsFetchingLeagues
} from "../../redux/rootReducer";
import { createLeague, cancelLeagueInvitation } from "../../redux/modules/user";

import { navigateToLeagues } from "../../redux/modules/location";

import "./DashboardPage.scss";

class DashboardPage extends Component {
  createLeague = () => {
    this.props
      .createLeague()
      .then(() => {
        this.props.navigateToDashboard();
      })
      .catch(err => {});
  };

  renderInvitationPendingContent = league => {
    return (
      <Fragment>
        <div>Invitation sent to {league.opponent}</div>
        <br />
        <button className="draftwars-btn">Edit Settings</button>
        <button
          className="draftwars-btn"
          onClick={() => this.props.cancelLeagueInvitation(league.id)}
        >
          Cancel invitation
        </button>
      </Fragment>
    );
  };

  renderDraftDayContent = league => {
    console.log("rendering draft now button");
    // return <DraftNowButton />;
    return <button className="draftwars-btn">Draft Now!</button>;
  };

  renderDraftCountdownContent = league => {
    return (
      <Fragment>
        <br />
        Its not time to draft yet, you will have to wait a bit.
      </Fragment>
    );
  };

  renderActiveMatchSummary = league => {
    return "Here is your active match summary!";
  };

  renderLeagueTile = league => {
    if (!league) {
      console.log("NO LEAGUE FOUND...");
      return null;
    }

    const isInvitationPending = league.user_list.length === 1;
    const hasActiveMatch = !!_find(league.matches, {
      week: this.props.currentWeek
    });

    let content = null;
    if (isInvitationPending) {
      content = this.renderInvitationPendingContent(league);
    } else if (!hasActiveMatch && this.props.isDraftDay) {
      content = this.renderDraftDayContent(league);
    } else if (!hasActiveMatch && !this.props.isDraftDay) {
      content = this.renderDraftCountdownContent(league);
    } else if (hasActiveMatch) {
      content = this.renderActiveMatchSummary(league);
    }

    return (
      <div className="league-tile" key={`league-tile-${league.id}`}>
        <div>{league.league_name}</div>
        {content}
        {<DraftNowButton />}
      </div>
    );
  };

  renderActiveLeagueList = () => {
    if (this.props.isFetchingUser) {
      return <div>loading...</div>;
    }

    if (_get(this.props.leagues, "length")) {
      return this.props.leagues.map(league => {
        return this.renderLeagueTile(league);
      });
    }

    return null;
  };

  render = () => {
    return (
      <div className="dashboard-page">
        {
          // If no leagues
          // Show button to start league and invite a friend
          // Start a head to head league. You can start a league any time and choose
          // the weeks you want to play
        }
        <div className="start-league-btn-container">
          <h2>Week {this.props.currentWeek}</h2>
          <button
            className="draftwars-btn start-league-btn"
            onClick={this.props.navigateToLeagues}
          >
            Start a League
          </button>
        </div>
        {this.renderActiveLeagueList()}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  leagues: getLeagues(state),
  isCreatingLeague: getIsCreatingLeague(state),
  isFetchingUser: getIsFetchingUser(state),
  currentWeek: getCurrentWeek(state),
  isDraftDay: getIsDraftDay(state)
  // isFetchingLeagues: getIsFetchingLeagues(state)
});

export default connect(
  mapStateToProps,
  {
    signInUser,
    signOutUser,
    createLeague,
    navigateToLeagues,
    cancelLeagueInvitation
  }
)(DashboardPage);
