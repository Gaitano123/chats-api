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
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    _full_name = db.Column(db.String, name='full_name')
    username = db.Column(db.String)
    phone_no = db.Column(db.Integer, unique=True)
    profile = db.Column(db.String)
    about = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    
    def __init__(self, first_name,last_name, username, phone_no, profile, about, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self._full_name = f"{first_name} {last_name}" 
        self.username = username
        self.phone_no = phone_no
        self.profile = profile
        self.about = about
        self.email = email
        self.password = self.generate_password_hash(password)
        
    def generate_password_hash(self, password):
        return bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @full_name.setter
    def full_name(self, value):
        names = value.split(" ", 1)
        self.first_name = names[0]
        self.last_name = names[1] if len(names) > 1 else ""

class Chat(db.Model, SerializerMixin):
    
    __tablename__ = 'chats'
    
    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.String)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    sender_user = db.relationship('User', backref='chats')
    
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
    
    sender_user = db.relationship('User', foreign_keys=[sender], backref = 'sent_pair_chats')
    receiver_user = db.relationship('User', foreign_keys=[receiver], backref= 'received_pair_chats')
    
    def __init__(self, chat, sender, receiver):
        self.chat = chat
        self.sender = sender
        self.receiver = receiver

class Group(db.Model, SerializerMixin):
    
    __tablename__ = 'groups'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    profile = db.Column(db.String)
    description = db.Column(db.String)
    
    admin = db.relationship('User', backref='groups')
    
    def __init__(self, name, admin_id, profile, description):
        self.name = name
        self.admin_id = admin_id
        self.profile = profile
        self.description = description

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
    chat = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    group = db.relationship('Group', backref='group_chats')
    sender_user = db.relationship('User', backref='group_chats_sender')
    
    def __init__(self, group_id, sender, chat):
        self.group_id = group_id
        self.sender = sender
        self.chat = chat
        
        
