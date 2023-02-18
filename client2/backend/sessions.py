from session import Session


class Sessions:
    def __init__(self):
        self.sessions = {}

    def ask(self, token, input):
        if token not in self.sessions:
            self.sessions[token] = Session(token)
            self.sessions[token].ask(None)
        return self.sessions[token].ask(input)
    