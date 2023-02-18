from session import Session
import logging


class Sessions:
    def __init__(self):
        self.sessions = {}
        self.log = logging.getLogger("Sessions")

    def ask(self, token, input):
        self.log("Sessions - ask")
        if token not in self.sessions:
            self.sessions[token] = Session(token)
            # self.sessions[token].ask(None)
            for data in self.sessions[token].ask(None):
                response = data["message"]
            self.log(data["message"])
        return self.sessions[token].ask(input)
    