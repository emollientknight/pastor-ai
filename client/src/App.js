import logo from "./logo.svg";
import "./App.css";
import { Box, Button } from "@mui/material";
import BottomBar from "./components/BottomBar";
import Body from "./components/Body";
import { Helmet } from "react-helmet";
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      page: 0,
      chat: {
        messages: [
          {
            id: 1,
            text: "Hello",
            sender: "bot",
          },
        ],
      },
    };
  }

  handleValue() {
    console.log("Value changed");
  }

  handleChangePage = (value) => {
    if (value === this.state.page) return;
    this.setState({ page: value });
  };

  sendMessage = (message) => {
    console.log("sent message: " + message);
    const messages = [...this.state.chat.messages];
    messages.push({
      id: messages.length + 1,
      text: message,
      sender: "user",
    });
    this.setState({ chat: { messages: messages } });
  };

  receivedMessage = (message) => {
    console.log("received message: " + message);
    const messages = [...this.state.chat.messages];
    messages.push({
      id: messages.length + 1,
      text: message,
      sender: "bot",
    });
    this.setState({ chat: { messages: messages } }); 
  }

  render() {
    console.log("rendering...");
    return (
      <div className="App">
        <Body {...this.state} sendMessage={this.sendMessage} receivedMessage={this.receivedMessage}></Body>
        <BottomBar onChangePage={this.handleChangePage}></BottomBar>
      </div>
    );
  }
}

export default App;
