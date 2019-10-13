import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import _get from "lodash/get";
import _find from "lodash/find";

import { history } from "../../App";
import { LEAGUE_QUERY, USER_QUERY } from "../../graphql/queries";
import { ACCEPT_LEAGUE_INVITATION_MUTATION } from "../../graphql/mutations";

import "./LeagueInvitePage.css";

class LeagueInvitePage extends Component {
  state = {};

  renderInviteMessage = ({
    data,
    loading,
    error,
    userData,
    userLoading,
    userError
  }) => {
    const userEmail = _get(userData, "user.email");
    const userList = _get(data, "league.user_list", []);
    const opponentEmail = _get(data, "league.opponent");

    if (loading || userLoading) {
      return <div>Loading...</div>;
    } else if (_find(userList, { email: userEmail })) {
      return <div>You are already part of this league.</div>;
    } else if (userEmail !== opponentEmail) {
      return (
        <div>
          <h1>
            Something went wrong, this user doesn't match the email in the
            invitation... login to a different account?
          </h1>
        </div>
      );
    }
    return (
      <Mutation mutation={ACCEPT_LEAGUE_INVITATION_MUTATION}>
        {mutate => (
          <div>
            <h1>
              You've been invited to {_get(data, "league.league_name")}
              <button
                className="draftwars-btn"
                onClick={async () => {
                  try {
                    await mutate({
                      variables: {
                        leagueId: _get(this.props.params, "leagueId")
                      }
                    });
                    history.push("/dashboard");
                  } catch (error) {
                    this.setState({ leagueAcceptError: error });
                  }
                }}
              >
                Accept invitation
              </button>
            </h1>
          </div>
        )}
      </Mutation>
    );
  };

  render = () => {
    return (
      <Query query={USER_QUERY}>
        {({ loading: userLoading, data: userData, error: userError }) => (
          <Query
            query={LEAGUE_QUERY}
            variables={{ league_id: _get(this.props.params, "leagueId") }}
          >
            {({ data, loading, error }) => (
              <div className="dashboard-page">
                {this.renderInviteMessage({
                  data,
                  loading,
                  error,
                  userData,
                  userLoading,
                  userError
                })}
              </div>
            )}
          </Query>
        )}
      </Query>
    );
  };
}

export default LeagueInvitePage;
