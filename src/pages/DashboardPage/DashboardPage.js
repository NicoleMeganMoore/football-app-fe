import React, { Component } from "react";
import "./DashboardPage.css";

export class DashboardPage extends Component {
  componentDidMount = () => {
    console.log("DASHBOARD COMPONENT MOUNTED");
  };
  render = () => {
    return (
      <div className="dashboard-page">
        <h1>Dashboard Page</h1>
      </div>
    );
  };
}
