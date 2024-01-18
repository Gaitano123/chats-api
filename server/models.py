from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash

app = Flask(__name__)

db = SQLAlchemy()
bcrypt = Bcrypt(app)


class User(db.Model, SerializerMixin):
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone_no = db.Column(db.Integer)
    profile = db.Column(db.String)
    about = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    
    def __init__(self, name, phone_no, profile, about, email, password):
        self.name = name
        self.phone_no = phone_no
        self.profile = profile
        self.about = about
        self.email = email
        self.password = self.generate_password_hash(password)
        
    def generate_password_hash(self, password):
        return bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class Chat(db.Model, SerializerMixin):
    
    __tablename__ = 'chats'
    
    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.String)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    sender = db.relationship('User', backref='chats')
    
    def __init__(self, chat, sender):
        self.chat = chat
        self.sender = sender

class Pair_chat(db.Model, SerializerMixin):
    
    __tablename__ = 'pair_chats'
    
    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.String)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver = db.Column(db.String, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    sender = db.relationship('User', backref = 'pair_chats')
    
    def __init__(self, chat, sender, receiver):
        self.chat = chat
        self.sender = sender
        self.receiver = receiver

class Group(db.Model, SerializerMixin):
    
    __tablename__ = 'groups'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    admin = db.Column(db.Integer, db.ForeignKey('users.id'))
    profile = db.Column(db.String)
    
    admin = db.relationship('User', backref='groups')
    
    def __init__(self, name, admin, profile):
        self.name = name
        self.admin = admin
        self.profile = profile

class Group_Member(db.Model, SerializerMixin):
    
    __tablename__ = 'group_members'
    
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
    member_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    group = db.relationship('Group', backref='group_members')
    member = db.relationship('User', backref='group_members')
    
    def __init__(self, group_id, member_id):
        self.group_id = group_id
        self.member_id = member_id

class Group_Chat(db.Model, SerializerMixin):
    
    __tablename__ = 'group_chats'
    
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    group = db.relationship('Group', backref='group_members')
    sender = db.relationship('User', backref='group_members')
    
    def __init__(self, group_id, sender):
        self.group_id = group_id
        self.sender = sender
        
