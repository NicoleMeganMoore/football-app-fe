// import React from "react";
// import gql from "graphql-tag";
// // import { useSubscription } from "react-apollo-hooks";
// // import { Subscription } from "react-apollo";
// import apolloClient, { subscribe } from "../../graphql/apolloClient";
// // import { execute, makePromise } from "apollo-link";

import "./DraftNowButton.scss";

// const LEAGUE_ADDED = gql`
//   subscription leagueAdded {
//     leagueAdded {
//       id
//       league_name
//     }
//   }
// `;

const DraftNowButton = props => {
  // const { data, loading, error } = useSubscription(
  //   LEAGUE_ADDED
  //   // { variables: { repoFullName } }
  // );

  // console.log({ data, loading, error });
  // if (error) {
  //   return JSON.stringify(error);
  // }

  // if (loading) {
  //   return "LOADING";
  // }

  // return (
  //   <Subscription
  //     subscription={LEAGUE_ADDED}
  //     onSubscriptionData={stuff => {
  //       console.log("subscription succeeded");
  //       console.log(stuff);
  //     }}
  //     onSubscriptionError={error => {
  //       console.log("subscription error:");
  //       console.log(error);
  //     }}
  //     client={apolloClient}
  //     shouldResubscribe
  //   >
  //     {stuff => {
  //       console.log(stuff);
  //       // if (loading && !data) return <div>loading {console.log(loading)}</div>;
  //       // return (
  //       //   <div>
  //       //     New comment: {!loading && data} {console.log(data)}{" "}
  //       //     {console.log("is loading?")} {console.log(loading)}
  //       //   </div>
  //       // );
  //       return JSON.stringify(stuff);
  //     }}
  //   </Subscription>
  // );

  // const handlers = {
  //   next: data => {
  //     console.log(`received data:`, data);
  //     if (data.data.info === "done") {
  //       console.log("exiting...");
  //       process.exit(0);
  //       return <div>{JSON.stringify(data)}</div>;
  //     }
  //   },
  //   error: error => {
  //     return <div>{JSON.stringify(error)}</div>;
  //     console.error(`received error ${error}`);
  //   }
  // };

  // const query = `subscription {
  //   leagueAdded {
  //     league_name
  //   }
  // }`;

  // subscribe(query, handlers);
  return null;
};

export default DraftNowButton;
