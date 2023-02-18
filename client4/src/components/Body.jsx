import React, { Component } from "react";

import ChatWindow from "./ChatWindow";

import "../css/Body.css";

class Body extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("Body - mounted");
  };

  sendMessage = (message) => {
    this.props.sendMessage(message);
  };
  state = {};
  render() {
    if (this.props.page === 0) {
      return (
        <div className="body">
          <ChatWindow {...this.props.chat} sendMessage={this.sendMessage} />
        </div>
      );
    } else if (this.props.page === 1) {
      return <div style={{ height: "100%", backgroundColor: "black" }}> </div>;
    }
    return <h1> 2</h1>;
  }
}

export default Body;
