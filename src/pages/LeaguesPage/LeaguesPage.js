import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "email-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createLeague } from "../../redux/modules/user";
import { navigateToDashboard } from "../../redux/modules/location";

import "./LeaguesPage.scss";

class LeaguesPage extends Component {
  state = {
    emailError: undefined,
    opponentValue: "nicolemcrawford@shaw.ca",
    passing_yd: 0.04,
    passing_td: 4,
    passing_int: -1,
    rushing_yd: 0.1,
    rushing_td: 6,
    receiving_yd: 0.1,
    receiving_td: 6,
    return_td: 6,
    two_pt_conversion: 2,
    fumble: -1,
    reception: 0
  };

  componentDidMount = () => {};

  onNewLeagueSubmit = e => {
    e.preventDefault();

    const isEmailValid = validator.validate(this.state.opponentValue);

    if (!isEmailValid) {
      toast.error(
        "Uh oh, something's not right. Please fix the errors indicated in the form.",
        {
          position: "top-right",
          autoClose: 500000000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        }
      );

      this.setState({
        emailError: "Invalid Email"
      });
    } else {
      this.props
        .createLeague(this.state)
        .then(this.props.navigateToDashboard)
        .catch(error => {});
    }
  };

  renderSetting = (displayName, key, int) => {
    return (
      <div className="league-setting-input-container">
        <label htmlFor={key}>{displayName}</label>
        <input
          className="league-setting-input"
          type="number"
          name={key}
          onChange={e => this.setState({ [key]: e.target.value })}
          value={this.state[key]}
        />
      </div>
    );
  };

  render = () => {
    return (
      <div className="leagues-page">
        <form onSubmit={this.onNewLeagueSubmit}>
          <h2>Opponent</h2>
          <div className="league-setting-input-container">
            <input
              type="text"
              placeholder="opponent email"
              onChange={e => this.setState({ opponentValue: e.target.value })}
              value={this.state.opponentValue}
            />
            {this.state.emailError && (
              <div className="opponent-input-validation-error">
                {this.state.emailError}
              </div>
            )}
          </div>
          <h2>Point Settings</h2>
          {this.renderSetting("Passing Yard", "passing_yd", false)}
          {this.renderSetting("Passing Touchdown", "passing_td", true)}
          {this.renderSetting("Passing Interception", "passing_int", true)}
          {this.renderSetting("Rushing Yard", "rushing_yd", false)}
          {this.renderSetting("Rushing Touchdown", "rushing_td", true)}
          {this.renderSetting("Receiving Yard", "receiving_yd", false)}
          {this.renderSetting("Receiving Touchdown", "receiving_td", true)}
          {this.renderSetting("Return Touchdown", "return_td", true)}
          {this.renderSetting("2-Pt Conversion", "two_pt_conversion", false)}
          {this.renderSetting("Fumble", "fumble", true)}
          {this.renderSetting("Reception", "reception", false)}

          <br />
          <div>
            <button type="submit" className="">
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    createLeague,
    navigateToDashboard
  }
)(LeaguesPage);
