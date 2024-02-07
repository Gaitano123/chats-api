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
        self.username = username.lower().replace(" ", "")
        self.phone_no = phone_no
        self.profile = profile if profile else 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEXk5ueutLfX2tynrrLn6eqrsbXq7O3h4+SyuLva3d6/w8bLz9HU19nR1NbIzM66v8KaEzi7AAAFHUlEQVR4nO2d23LjIAxAjREXYwP//7cLTrpNUzs1IEdyhvOwM7vbB5+RAHHtMHQ6nU6n0+l0Op1Op9PpdDqdTqfT6XQ6nU4JoDUMZhoTk1n/clHSt5vFRftNdN5oTf1dFYA2wYrf2HA5H9DBSrXhIoSSYoYLpRsMQcpNkxtSBkP9jUcxs3qlsuqoYC4QHTDebufXk4717HVgcuqIS2o7yk28bcDHYyqrjvWc+zUI4rhLshGBb2zAFZjcdNzAVAcKUuy/TeRpU+PC1qbKJdswHEBdnUsacQL1p/8i1Lqk2MzUH/8TWKpVcg+9sGo25lAJs4udqAUeqW4w99hEPqEB3+aSOgFGhU2jSo4Nl9Do8Nf05YCMYxIaaHdJNjyGTh0RXISILEJjMAKT4DBV043d8n8cvQyYrdWxCpSlD42ecVwSM3mrAZzmL3LvTN2hwYSUZQk7EucZ4GVZmgoQ5xlg9WWCQZ5NlZPlTZlIOxOABa/JJGgnaZhNJjcaWpmGqf+GDO3ShkFs/+Q9AGb7X5fQCPMMJrTxf4W0PIMRtTMTgrIGQO6ZhSKVaV6WeZJZ6FzQZeQnySj/QTLyk2Ro20zL4v+mTB9nmMqQLtB8UjmDXTWTFprNu0xPMrRTAOTJGe1OLfK02dNOm1G7M+pVQPNBS024i4DURzXAI6410zaZofk4wwPkWZY3zpBc0ihDHRjMwpk8y5IN1jZgpDYZEPcBA/kuYAJwXCy1xwrMKCc0mJwKhqLDzHtQW9yBpT00kkFXdqPuEPAjynJo/SswNQeG040N35Zoktf52abiWTnqz/8BTC31puWUZEPjTg31MZNfNExsKFfL96it0Xg1/i/mqmbD0wVqOmjS7aXXjAdvAn67UG7I/AEYWxIcKchn/a+AwR23kbzGyg30cnBCoNTCprjcBYw7pOOYDfvbgB7j6+JGKRvHq7zaALA4uxuepOKWS70IAFNwdqOjzkEJ05VUMgBm9CFaKdXqlP6U0kY3j+ZqKivJx0yLD8FlQpiXabqmyZ307eaL4coi62stT1xQJ3/2YCY/pwyLD8/OuJxqZv3fa5BayhKikCtP3Zm6/6t188TysvkX+dtSMJz97bA11qQfyj3bYPhJ5WY+zlmkZA6QfjqGlHecfFJi5YioIpHvzEs5tzBJOtBDDknprOynj4jB05cFqWxpNHnwWQbKTk6/LChLfVLVNhsqHT34iKZy8xE2TBQ6WgdEjQfi26MD4Nsbyg7yvUfokopAutC8hZLubas2qVwpWlCq0RHhLXMFGEbUo4x7OtafP46CCWgnf17bKDeeG5y8UnFyhj3o2FOf2oPhTWH50onnbUMB7nW5IzZ2Pqnl6OWtYblzzmtuULeX1Io6Zff2fS3/yUZij6BgIpGLyDfRUGMDeMdKq2wwTwm1HVlAAPE6OrkLog0DlwSOzfuHym0w2g3gXl6qx2L0aajXfVpAuJDWeCwOkebXQ2Fk49J8boB4sHymbfAEqoJsB9VQdGIcWEZFNby1h3TKH5H6REN7IA+Tyh6t/ej1CdS+t6l5lDHPVA2dMFJ/9iZ1oWEamKprtujvFmBRc2kQ82osKqripWoms5gtiudp4Kk/eZfyJxC4TMm2KO0CsB8uQ6X0QQfs13FQKc4zmoXlgxROoDk3mVQ7FzUazOdxT6Dsvh2MnAMjVNFvFmM3xXyibJ0G5e71edgSGcNm5W+HIhkneVNUa66/AZMxZaMm8KbIpdPpdDqdTucq/AMef1AMtjuGRwAAAABJRU5ErkJggg=='
        self.about = about if about else 'Well and good'
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
        self.profile = profile if profile else default_profile_path_for_group
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
        
        
