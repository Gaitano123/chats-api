from flask import Flask
from flask_migrate import Migrate
from flask_restx import Api, fields, Namespace, Resource

from models import db, app, Chat,Group, User, Group_Chat,Pair_chat,Group_Member
# from routes import ns


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
ns = Namespace("api")


user_model = api.model("user",{
    "id":fields.Integer,
    "first_name": fields.String,
    "last_name": fields.String,
    "_full_name": fields.String,
    "username": fields.String,
    "phone_no": fields.String,
    "profile": fields.String,
    "about": fields.String,
    "email": fields.String,
    "password": fields.String
})

user_input_model = api.model("user",{
    "first_name": fields.String,
    "last_name": fields.String,
    "username": fields.String,
    "phone_no": fields.String,
    "profile": fields.String,
    "about": fields.String,
    "email": fields.String,
    "password": fields.String
})

chat_model = api.model("Chat", {
    "id": fields.Integer,
    "chat": fields.String,
    "sender": fields.Integer,
    "sender_name": fields.String(attribute=lambda x: User.query.get(x.sender).username),
    "created_at": fields.DateTime
})

chat_input_model = api.model("Chat", {
    "chat": fields.String,
    "sender": fields.Integer,
})

pair_chat_model = api.model("Pair_Chat", {
    "id": fields.Integer,
    "chat": fields.String,
    "sender": fields.Integer,
    "sender_name": fields.String(attribute=lambda x: User.query.get(x.sender).username),
    "receiver": fields.Integer,
    "receiver_name": fields.String(attribute=lambda x: User.query.get(x.receiver).username),
    "created_at": fields.DateTime
})

pair_chat_input_model = api.model("Pair_Chat", {
    "chat": fields.String,
    "sender": fields.Integer,
    "receiver": fields.Integer,
})

groups_model = api.model("Group", {
    "id": fields.Integer,
    "name": fields.String,
    "admin_id": fields.Integer,
    "admin_name": fields.String(attribute=lambda x: User.query.get(x.admin_id).username),
    "profile": fields.String,
    "description": fields.String
})

groups_input_model = api.model("Group", {
    "name": fields.String,
    "admin_id": fields.Integer,
    "profile": fields.String,
    "description": fields.String
})

group_member_model = api.model("Group_Member", {
    "id": fields.Integer,
    "group_id": fields.Integer,
    "group_name": fields.String(attribute=lambda x: Group.query.get(x.group_id).name),
    "member_id": fields.Integer,
    "member_name": fields.String(attribute=lambda x: User.query.get(x.member_id).username)
})

group_member_input_model = api.model("Group_Member", {
    "group_id": fields.Integer,
    "member_id": fields.Integer,
})

group_chat_model = api.model("Group_Chat", {
    "id": fields.Integer,
    "group_id": fields.Integer,
    "group_name": fields.String(attribute=lambda x: Group.query.get(x.group_id).name),
    "sender": fields.Integer,
    "sender_name": fields.String(attribute=lambda x: User.query.get(x.sender).username),
    "chat": fields.String,
    "created_at": fields.DateTime
})

group_chat_input_model = api.model("Group_Chat", {
    "group_id": fields.Integer,
    "sender": fields.Integer,
    "chat": fields.String,
})
    
@ns.route("/users")
class Users(Resource):
    
    @ns.marshal_list_with(user_model)
    def get(self):
        return User.query.all()
    
@ns.route("/users/<int:id>")    
class UserById(Resource):
    
    @ns.marshal_with(user_model)
    def get(self, id):
        user = User.query.get(id)
        return user
    
@ns.route("/chats")
class Chats(Resource):
    
    @ns.marshal_list_with(chat_model)
    def get(self):
        return Chat.query.all()
    
@ns.route("/chats/<int:id>")
class ChatsById(Resource):
    
    @ns.marshal_with(chat_model)
    def get(self, id):
        chat = Chat.query.get(id)
        return chat    
    
@ns.route("/pair-chats")
class PairChats(Resource):
    
    @ns.marshal_list_with(pair_chat_model)
    def get(self):
        return Pair_chat.query.all()

@ns.route("/pair-chat/<int:id>")
class PairChatById(Resource):
    
    @ns.marshal_with(pair_chat_model)
    def get(self, id):
        pair_chat = Pair_chat.query.get(id)
        return pair_chat

@ns.route("/groups")
class Groups(Resource):
    
    @ns.marshal_list_with(groups_model)
    def get(self):
        return Group.query.all()

@ns.route("/groups/<int:id>")
class GroupById(Resource):
    
    @ns.marshal_with(groups_model)
    def get(self, id):
        group = Group.query.get(id)
        return group
    
@ns.route("/group-memebers")
class GroupMembers(Resource):
    
    @ns.marshal_list_with(group_member_model)
    def get(self):
        return Group_Member.query.all()

@ns.route("/group-members/<int:id>")
class GroupMemberById(Resource):
    
    @ns.marshal_with(group_member_model)
    def get(self, id):
        member = Group_Member.query.get(id)
        return member
    
@ns.route("/group-chats")
class GroupChats(Resource):
    
    @ns.marshal_list_with(group_chat_model)
    def get(self):
        return Group_Chat.query.all()

@ns.route("/group-chat/<int:id>")
class GroupChatById(Resource):
    
    @ns.marshal_with(group_chat_model)
    def get(self, id):
        chat = Group_Chat.query.get(id)
        return chat

api.add_namespace(ns)

if __name__ == '__main__':
    app.run(debug=True, port = 5555)