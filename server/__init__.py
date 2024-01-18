from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash


app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SECRET_KEY'] = 'bb8f7de46cd7426ebf3ca7df06d43665'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
api = Api(app)
CORS(app)


