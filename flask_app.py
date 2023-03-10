import os
from time import sleep
from dotenv import load_dotenv
from flask import Flask,render_template,send_from_directory,request, jsonify,make_response
from flask_cors import CORS, cross_origin

from sessions import Sessions

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)
import logging

# from logging.config import dictConfig

# dictConfig({
#     'version': 1,
#     'formatters': {'default': {
#         'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
#     }},
#     'handlers': {'wsgi': {
#         'class': 'logging.StreamHandler',
#         'stream': 'ext://flask.logging.wsgi_errors_stream',
#         'formatter': 'default'
#     }},
#     'root': {
#         'level': 'INFO',
#         'handlers': ['wsgi']
#     }
# })

logging.basicConfig(filename='record.log', level=logging.INFO)


app = Flask(__name__ 
    ,static_folder='client/build',static_url_path='')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


sessions = Sessions()


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/ask', methods=['POST'], )
@cross_origin()
def ask():
    content_type = request.headers.get('Content-Type')
    app.logger.info(content_type)
    app.logger.error(content_type)
    if (content_type == 'application/json'):
        json = request.json
        app.logger.info(json)
        for data in sessions.ask(json['token'], json['input']):
            response = data["message"]
        app.logger.info(data["message"])
        return jsonify({"data": data["message"]}), 200
    else:
        return 'Content-Type not supported!'
    