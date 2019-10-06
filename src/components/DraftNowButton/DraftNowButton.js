import React from "react";
import gql from "graphql-tag";
import { useSubscription } from "react-apollo-hooks";
import { Subscription } from "react-apollo";

import "./DraftNowButton.scss";

const leagueAdded = gql`
  subscription {
    leagueAdded {
      id
      league_name
    }
  }
`;

const DraftNowButton = props => {
  // const { loading, data, error } = useSubscription(leagueAdded, {
  //   onSubscriptionData: ({ client, subscriptionData }) => {
  //     console.log("---------data from websocket:----------");
  //     console.log(client);
  //     console.log(subscriptionData);
  //     console.log("----------------end-----------------");
  //     // Optional callback which provides you access to the new subscription
  //     // data and the Apollo client. You can use methods of the client to update
  //     // the Apollo cache:
  //     // https://www.apollographql.com/docs/react/advanced/caching.html#direct
  //   },
  //   onSubscriptionError: stuff => {
  //     console.log(stuff);
  //   }
  // });

  // , {
  //   suspend: false
  // });

  // return null;
  return (
    <Subscription
      subscription={leagueAdded}
      onSubscriptionData={stuff => {
        console.log("subscription succeeded");
        console.log(stuff);
      }}
      onSubscriptionError={error => {
        console.log("subscription error:");
        console.log(error);
      }}
    >
      {stuff => {
        console.log(stuff);
        // if (loading && !data) return <div>loading {console.log(loading)}</div>;
        // return (
        //   <div>
        //     New comment: {!loading && data} {console.log(data)}{" "}
        //     {console.log("is loading?")} {console.log(loading)}
        //   </div>
        // );
        return JSON.stringify(stuff);
      }}
    </Subscription>
  );

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error</div>;
  // return data.posts.map(post => (
  //   <div>
  //     <h3>{post.subject}</h3>
  //     <p>{post.content}</p>
  //   </div>
  // ));

  // <button
  // className={`fancy-button ${props.className}`}
  // onClick={props.onClick}
  // type="submit"
  // >
  // Draft Now
  // </button>
};

export default DraftNowButton;
