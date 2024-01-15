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

class Chat(db.Model, SerializerMixin):
    
    __tablename__ = 'chats'
    
    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.String)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Pair_chat(db.Model, SerializerMixin):
    
    __tablename__ = 'pair_chats'
    
    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.String)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver = db.Column(db.String, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Group(db.Model, SerializerMixin):
    
    __tablename__ = 'groups'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    admin = db.Column(db.Integer, db.ForeignKey('users.id'))
    profile = db.Column(db.string)

class Group_Member(db.Model, SerializerMixin):
    
    __tablename__ = 'group_members'
    
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.foreignKey('groups.id'))
    member_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Group_Chat(db.Model, SerializerMixin):
    
    __tablename__ = 'group_chats'
    
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.foreignKey('groups.id'))
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
