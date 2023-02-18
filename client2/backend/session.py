
from prompt import Prompt


class Session:
    def __init__(self, token):
        self.token = token
        self.prompt = Prompt()
    def ask(self, input):
        if input != None:
            self.prompt.setPrompt(input)
        return self.prompt.ask()

    
        




