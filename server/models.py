from server import db, SerializerMixin, datetime

class User(db.Model, SerializerMixin):
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone_no = db.Column(db.Integer)
    profile = db.Column(db.string)
    about = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    
    def __init__(self, name, phone_no, profile, about, email, password):
        self.name = name
        self.phone_no = phone_no
        self.profile = profile
        self.about = about
        self.email = email
        password = password

class Chat(db.Model, SerializerMixin):
    
    __tablename__ = 'chats'
    
    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.String)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
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
    
    def __init__(self, chat, sender, receiver):
        self.chat = chat
        self.sender = sender
        self.receiver = receiver

class Group(db.Model, SerializerMixin):
    
    __tablename__ = 'groups'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    admin = db.Column(db.Integer, db.ForeignKey('users.id'))
    profile = db.Column(db.string)
    
    def __init__(self, name, admin, profile):
        self.name = name
        self.admin = admin
        self.profile = profile

class Group_Member(db.Model, SerializerMixin):
    
    __tablename__ = 'group_members'
    
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.foreignKey('groups.id'))
    member_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    def __init__(self, group_id, member_id):
        self.group_id = group_id
        self.member_id = member_id

class Group_Chat(db.Model, SerializerMixin):
    
    __tablename__ = 'group_chats'
    
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.foreignKey('groups.id'))
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    def __init__(self, group_id, sender):
        self.group_id = group_id
        self.sender = sender
        
