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
            sender: "user",
          },
          {
            id: 2,
            text: "Hi",
            sender: "bot",
          },
          {
            id: 3,
            text: "Helloasdfasdfasdfasdfsadfasdfsdfasdfsadfasdf sadfasdfasdfsad fasdf asdf asdf sad fas fsd fasd fsad fasd fsad fsd af asdfa sdf asdf asd fasd fasd fasd fasd fasd fasd fas dfas dfa sdf asdfa sdfs adf sfa sdf asdf ds",
            sender: "user",
          },
          {
            id: 5,
            text: "Hello",
            sender: "user",
          },
          {
            id: 4,
            text: "Hello",
            sender: "user",
          },
          {
            id: 19,
            text: "Hello",
            sender: "user",
          },
          {
            id: 119,
            text: "Hello",
            sender: "user",
          },
          {
            id: 119,
            text: "Hello",
            sender: "user",
          },
          {
            id: 1111,
            text: "Hello",
            sender: "user",
          },

          {
            id: 11119,
            text: "Hello",
            sender: "user",
          },
          {
            id: 11119,
            text: "Hello",
            sender: "user",
          },
          {
            id: 9,
            text: "Hello",
            sender: "user",
          },
          {
            id: 9,
            text: "Hello",
            sender: "user",
          },

          {
            id: 9,
            text: "Hello",
            sender: "user",
          },
          {
            id: 9,
            text: "Hello",
            sender: "user",
          },
          {
            id: 1231239,
            text: "Hello",
            sender: "user",
          },
          {
            id: 23131231239,
            text: "Hello",
            sender: "user",
          },
          {
            id: 111111119,
            text: "Hello",
            sender: "user",
          },
          {
            id: 123123239,
            text: "Hello",
            sender: "user",
          },
          {
            id: 9,
            text: "Hello",
            sender: "user",
          },
          {
            id: 12312339,
            text: "Hello",
            sender: "user",
          },
          {
            id: 1231231239,
            text: "Hello",
            sender: "user",
          },
          {
            id: 1231231111239,
            text: "Hello",
            sender: "user",
          },
          {
            id: 123121131111239,
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

  render() {
    console.log("rendering...");
    return (
      <div className="App">
        {/* <Helmet> */}
        {/* <style>{'body { background-color: #282c34; }'}</style> */}
        {/* <Box sx={{ flex: 1, bgcolor: 'primary.main'}}>
          ITems
        </Box> */}
        <Body {...this.state} sendMessage={this.sendMessage}></Body>
        <BottomBar onChangePage={this.handleChangePage}></BottomBar>
        {/* </Helmet> */}
      </div>
    );
  }
}

export default App;
