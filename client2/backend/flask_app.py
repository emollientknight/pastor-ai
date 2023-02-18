import os
from time import sleep
from dotenv import load_dotenv
from flask import Flask, jsonify, request

from sessions import Sessions

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)

from logging.config import dictConfig

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})


app = Flask(__name__)

sessions = Sessions()


@app.route("/")
def hello_world():
    return jsonify({"data": "Hello, World!"}), 200
@app.route('/ask', methods=['POST'], )
def ask():
    content_type = request.headers.get('Content-Type')
    app.logger.info(content_type)
    if (content_type == 'application/json'):
        json = request.json
        app.logger.info(json)
        data = sessions.ask(json['token'], json['input'])
        app.logger.info(data['choices'][0]['text'])
        return jsonify({"data": data['choices'][0]['text']}), 200
    else:
        return 'Content-Type not supported!'
    