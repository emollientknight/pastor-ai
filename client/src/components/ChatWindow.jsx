import { List, Paper, SvgIcon, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

import React, { Component } from "react";

import "../css/ChatWindow.css";
import { AccountCircle } from "@mui/icons-material";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { value: "", oldValue: "" };
  }
  state = {};

  componentDidMount = () => {
    console.log("componentDidMount");
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    // this.container.current.scrollIntoView({ behavior: "smooth" });
    console.log("scrollToBottom");
    this.container.current.scrollTop = this.container.current.scrollHeight;
  };

  handleClick = async (e) => {
    if (this.state.value != "") {
      this.props.sendMessage(this.state.value);
      this.state.oldValue = this.state.value;
      this.setState({ value: "" });
      setTimeout(() => this.scrollToBottom());
      var response = await this.fetchResponse(this.state.oldValue);
      if (response != null ) {
        console.log(response);
        this.props.receivedMessage(response);
        setTimeout(() => this.scrollToBottom());
      }
    }
  };

  handleEnter = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
  };

  fetchResponse = async (input) => {
    console.log("fetch response called")
    const token = Math.floor(Math.random() * 1000000);
    const inputData = { input, token };
    // try {
    const response = await fetch("http://mypastor.ai/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    if (response.ok) {
      console.log("response worked!");
      const data = await response.json();
      return data.data;
    } else {
      console.log("response didn't work");
      alert("Failed to connect to server");
      // throw new Error("Failed to connect to server");
      return null;
    }
  };

  buildMessage = (message, index) => {
    return <Message key={index} {...message} />;
  };

  render() {
    return (
      <div className="chatWindow">
        <h1>Pastor AI</h1>
        <Paper style={{ maxHeigt: "100%", overflow: "auto" }}>
          <List
            ref={this.container}
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "fixed",
              overflow: "auto",
              bottom: "80px",
              top: "73px",
            }}
          >
            {this.props.messages.map((message, index) =>
              this.buildMessage(message, index)
            )}
          </List>
          <TextField
            className="chatInput"
            id="outlined-basic"
            value={this.state.value}
            onKeyDown={this.handleEnter}
            onChange={this.handleOnChange}
            placeholder="Type a message..."
            style={{
              position: "fixed",
              // top: "97%",
              bottom: "10px",
              left: "10px",
              right: "90px",
              backgroundColor: "white",
            }}
          />
          <div className="sendButton">
            <SendIcon
              className="SendIcon"
              sx={{
                color: "#567dcc",
                fontSize: 40,
                ":hover": { color: "black" },
              }}
              onClick={this.handleClick}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default ChatWindow;

function chatStyle(props) {
  if (props.sender != "user") {
    return {
      marginLeft: "50px",
      textAlign: "left",
    };
  } else {
    return {
      textAlign: "right",
      marginRight: "50px",
    };
  }
}

function Message(props) {
  return (
    <React.Fragment>
      <h2 style={chatStyle(props)}>
        {props.sender} {props.text}
      </h2>
      <Box display="flex" justifyContent="flex-end">
        <AccountCircle
          sx={{ fontSize: "40", alignSelf: "left" }}
          // className="AccountCircle"
        />
      </Box>
    </React.Fragment>
  );
}

function leftMessage(props) {
  return (
    <h2 style={chatStyle(props)}>
      {props.sender} {props.text}
    </h2>
  );
}
