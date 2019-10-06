import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _find from "lodash/find";

import {
  fetchLeagueById,
  acceptLeagueInvitation
} from "../../redux/modules/user";

import "./LeagueInvitePage.css";
import { getUser } from "../../redux/rootReducer";

class LeagueInvitePage extends Component {
  state = {
    isCheckingUser: true,
    isAuthorized: false,
    alreadyAccepted: false
  };

  componentDidMount = () => {
    const leagueId = _get(this.props.params, "leagueId");

    this.props
      .fetchLeagueById(leagueId)
      .then(league => {
        const userEmail = _get(this.props.user, "email");
        const userList = _get(league, "user_list", []);
        if (_find(userList, { email: userEmail })) {
          // This person is authorized but has already accepted the invitation
          return this.setState({
            isCheckingUser: false,
            isAuthorized: true,
            alreadyAccepted: true
          });
        }
        // This person is authorized and hasnt accepted yet
        return this.setState({
          isCheckingUser: false,
          isAuthorized: true,
          league: league
        });
      })
      .catch(() => {
        // This person is not authorized to view this link
        this.setState({ isCheckingUser: false, isAuthorized: false });
      });
  };

  onAcceptClick = () => {
    this.props
      .acceptLeagueInvitation(_get(this.props.params, "leagueId"))
      .then(() => {
        this.props.navigateToDashboard();
      })
      .catch(error => {});
  };

  renderInviteMessage = () => {
    if (this.state.isCheckingUser) {
      return <div>Loading...</div>;
    } else if (!this.state.isAuthorized) {
      return (
        <div>
          <h1>
            Something went wrong, this user doesn't match the email in the
            invitation... login to a different account?
          </h1>
        </div>
      );
    } else if (this.state.alreadyAccepted) {
      return <div>You have already accepted this invitation</div>;
    }
    return (
      <div>
        <h1>
          You've been invited to {_get(this.state.league, "league_name")}
          <button className="draftwars-btn" onClick={this.onAcceptClick}>
            Accept invitation
          </button>
        </h1>
      </div>
    );
  };

  render = () => {
    return <div className="dashboard-page">{this.renderInviteMessage()}</div>;
  };
}

const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(
  mapStateToProps,
  {
    fetchLeagueById,
    acceptLeagueInvitation
  }
)(LeagueInvitePage);
