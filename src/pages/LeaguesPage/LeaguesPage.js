import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "email-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mutation } from "react-apollo";

import { history } from "../../App";
import { USER_QUERY } from "../../graphql/queries";
import { CREATE_LEAGUE_MUTATION } from "../../graphql/mutations";
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

  onNewLeagueSubmit = async (e, mutate) => {
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
      try {
        await mutate({
          variables: {
            leagueInput: {
              opponent: this.state.opponentValue,
              pts_per_passing_yd: this.state.pts_per_passing_yd,
              pts_per_passing_td: this.state.pts_per_passing_td,
              pts_per_passing_int: this.state.pts_per_passing_int,
              pts_per_rushing_yd: this.state.pts_per_rushing_yd,
              pts_per_rushing_td: this.state.pts_per_rushing_td,
              pts_per_receiving_yd: this.state.pts_per_receiving_yd,
              pts_per_receiving_td: this.state.pts_per_receiving_td,
              pts_per_return_td: this.state.pts_per_return_td,
              pts_per_two_pt_conversion: this.state.pts_per_two_pt_conversion,
              pts_per_fumble: this.state.pts_per_fumble,
              pts_per_reception: this.state.pts_per_reception
            }
          }
        });

        history.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
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
      <Mutation
        mutation={CREATE_LEAGUE_MUTATION}
        refetchQueries={() => [{ query: USER_QUERY }]}
        // update={(cache, { data: { createLeague } }) => {
        //   const { user } = cache.readQuery({ query: USER_QUERY });
        //   cache.writeQuery({
        //     query: USER_QUERY,
        //     data: { user: { leagues: user.leagues.concat([createLeague]) } }
        //   });
        // }}
      >
        {mutate => (
          <div className="leagues-page">
            <form onSubmit={e => this.onNewLeagueSubmit(e, mutate)}>
              <h2>Opponent</h2>
              <div className="league-setting-input-container">
                <input
                  type="text"
                  placeholder="opponent email"
                  onChange={e =>
                    this.setState({ opponentValue: e.target.value })
                  }
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
              {this.renderSetting(
                "2-Pt Conversion",
                "two_pt_conversion",
                false
              )}
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
        )}
      </Mutation>
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
