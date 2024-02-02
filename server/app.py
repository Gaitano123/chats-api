from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restx import Api, fields, Namespace, Resource
import jwt
import datetime

from models import db, app, Chat,Group, User, Group_Chat,Pair_chat,Group_Member, bcrypt, check_password_hash
# from routes import ns


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SECRET_KEY'] = 'bb8f7de46cd7426ebf5ca7df06d43665'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
ns = Namespace("api")


user_model = api.model("User",{
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

user_input_model = api.model("User",{
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
    "member_name": fields.String(attribute=lambda x: User.query.get(x.member_id).username),
    "profile": fields.String(attribute=lambda x: User.query.get(x.member_id).profile),
    "about": fields.String(attribute=lambda x: User.query.get(x.member_id).about),
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

login_input = api.model("Login", {
    "username": fields.String,
    "password": fields.String
})
    
@ns.route("/users")
class Users(Resource):
    
    @ns.marshal_list_with(user_model)
    def get(self):
        return User.query.all()
    
    @ns.expect(user_input_model)
    @ns.marshal_with(user_model)
    def post(self):
        user = User(
            first_name= ns.payload["first_name"],
            last_name= ns.payload["last_name"],
            username= ns.payload["username"],
            phone_no= ns.payload["phone_no"],
            profile= ns.payload["profile"],
            about= ns.payload["about"],
            email= ns.payload["email"],
            password= ns.payload["password"]
        )
        db.session.add(user)
        db.session.commit()
        return user, 201
    
@ns.route("/user/<int:id>")    
class UserById(Resource):
    
    @ns.marshal_with(user_model)
    def get(self, id):
        user = User.query.get(id)
        return user
    
    @ns.expect(user_input_model)
    @ns.marshal_with(user_model)
    def patch(self, id):
        user = User.query.get(id)
        
        if not user:
            ns.abort(404, message="User not found")
            
        for key, value in ns.payload.items():
            setattr(user, key, value)
            
        db.session.commit()
        return user
    
    @ns.expect(user_input_model)
    @ns.marshal_with(user_model)
    def put(self, id):
        user = User.query.get(id)
        user.first_name= ns.payload["first_name"]
        user.last_name= ns.payload["last_name"]
        user.username= ns.payload["username"]
        user.phone_no= ns.payload["phone_no"]
        user.profile= ns.payload["profile"]
        user.about= ns.payload["about"]
        user.email= ns.payload["email"]
        user.password= ns.payload["password"]
        db.session.commit()
        return user
    
    def delete(self, id):
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        return {}, 201
    
@ns.route("/chats")
class Chats(Resource):
    
    @ns.marshal_list_with(chat_model)
    def get(self):
        return Chat.query.all()
    
    @ns.expect(chat_input_model)
    @ns.marshal_with(chat_model)
    def post(self):
        chat = Chat(
            chat= ns.payload["chat"],
            sender= ns.payload["sender"]
        )
        db.session.add(chat)
        db.session.commit()
        return chat
    
@ns.route("/chats/<int:id>")
class ChatsById(Resource):
    
    @ns.marshal_with(chat_model)
    def get(self, id):
        chat = Chat.query.get(id)
        return chat  
    
    @ns.expect(chat_input_model)
    @ns.marshal_with(chat_model)
    def patch(self, id):
        chat = Chat.query.get(id)
        
        if not chat:
            ns.abort(401, message = "chat not found")
            
        for key, value in ns.payload.items():
            setattr(chat, key, value)
            
        db.session.commit()
        return chat
    
    @ns.expect(chat_input_model)
    @ns.marshal_with(chat_model)
    def put(self, id):
        chat = Chat.query.get(id)
        chat.chat= ns.payload["chat"],
        chat.sender= ns.payload["sender"]
        db.session.commit()
        return chat
          
    
    def delete(self, id):
        chat = Chat.query.get(id)
        db.session.delete(chat)
        db.session.commit()
        return {}, 201
    
@ns.route("/pair-chats")
class PairChats(Resource):
    
    @ns.marshal_list_with(pair_chat_model)
    def get(self):
        return Pair_chat.query.all()
    
    @ns.expect(pair_chat_input_model)
    @ns.marshal_with(pair_chat_model)
    def post(self):
        pair_chat = Pair_chat(
            chat= ns.payload["chat"],
            sender= ns.payload["sender"],
            receiver= ns.payload["receiver"]
        )
        db.session.add(pair_chat)
        db.session.commit()
        return pair_chat, 201

@ns.route("/pair-chat/<int:id>")
class PairChatById(Resource):
    
    @ns.marshal_with(pair_chat_model)
    def get(self, id):
        pair_chat = Pair_chat.query.get(id)
        return pair_chat
    
    @ns.expect(pair_chat_input_model)
    @ns.marshal_with(pair_chat_model)
    def patch(self, id):
        pair_chat = Pair_chat.query.get(id)
        
        if not pair_chat:
            ns.abort(401, message="pair chat not found")
            
        for key, value in ns.payload.items():
            setattr(pair_chat, key, value)
            
        db.session.commit()
        return pair_chat
    
    @ns.expect(pair_chat_input_model)
    @ns.marshal_with(pair_chat_model)
    def put(self, id):
        pair_chat = Pair_chat.query.get(id)
        pair_chat.chat= ns.payload["chat"]
        pair_chat.sender= ns.payload["sender"]
        pair_chat.receiver= ns.payload["receiver"]
        db.session.commit()
        return pair_chat
        
    
    def delete(self, id):
        pair_chat = Pair_chat.query.get(id)
        db.session.delete(pair_chat)
        db.session.delete()
        return {}, 201

@ns.route("/groups")
class Groups(Resource):
    
    @ns.marshal_list_with(groups_model)
    def get(self):
        return Group.query.all()
    
    @ns.expect(groups_input_model)
    @ns.marshal_with(groups_model)
    def post(self):
        group = Group(
            name= ns.payload["name"],
            admin_id= ns.payload["admin_id"],
            profile= ns.payload["profile"],
            description= ns.payload["description"]
        )
        db.session.add(group)
        db.session.commit()
        return group

@ns.route("/group/<int:id>")
class GroupById(Resource):
    
    @ns.marshal_with(groups_model)
    def get(self, id):
        group = Group.query.get(id)
        return group
    
    @ns.expect(groups_input_model)
    @ns.marshal_with(groups_model)
    def patch(self, id):
        group = Group.query.get(id)
        
        if not group:
            ns.abort(401, message="Group not found")
            
        for key, value in ns.payload.items():
            setattr(group, key, value)
            
        db.session.commit()
        return group
    
    @ns.expect(group_chat_model)
    @ns.marshal_with(groups_model)
    def put(self, id):
        group = Group.query.get(id)
        group.name= ns.payload["name"],
        group.admin_id= ns.payload["admin_id"],
        group.profile= ns.payload["profile"],
        group.description= ns.payload["description"]
        db.session.commit()
        return group
        
    
    def delete(self, id):
        group = Group.query.get(id)
        db.session.delete(group)
        db.session.commit()
        return {}, 201
    
@ns.route("/group-members")
class GroupMembers(Resource):
    
    @ns.marshal_list_with(group_member_model)
    def get(self):
        return Group_Member.query.all()
    
    @ns.expect(group_member_input_model)
    @ns.marshal_with(group_member_model)
    def post(self):
        member = Group_Member(
            group_id= ns.payload["group_id"],
            member_id= ns.payload["member_id"]
        )
        db.session.add(member)
        db.session.commit()
        return member

@ns.route("/group-member/<int:id>")
class GroupMemberById(Resource):
    
    @ns.marshal_with(group_member_model)
    def get(self, id):
        member = Group_Member.query.get(id)
        return member
    
    @ns.expect(group_member_input_model)
    @ns.marshal_with(group_member_model)
    def patch(self, id):
        member = Group_Member.query.get(id)
        
        if not member:
            ns.abort(404, "group member not found")
            
        for key, value in ns.payload.items():
            setattr(member, key, value)
            
        db.session.commit()
        return member
    
    @ns.expect(group_member_input_model)
    @ns.marshal_with(group_member_model)
    def put(self, id):
        member = Group_Member.query.get(id)
        member.group_id= ns.payload["group_id"],
        member.member_id= ns.payload["member_id"]
        db.session.commit()
        return member
    
    def delete(self, id):
        member = Group_Member.query.get(id)
        db.session.delete(member)
        db.session.commit()
        return {},201
    
@ns.route("/group-chats")
class GroupChats(Resource):
    
    @ns.marshal_list_with(group_chat_model)
    def get(self):
        return Group_Chat.query.all()
    
    @ns.expect(group_chat_input_model)
    @ns.marshal_with(group_chat_model)
    def post(self):
        chat = Group_Chat(
            group_id= ns.payload["group_id"],
            sender= ns.payload["sender"],
            chat= ns.payload["chat"]
        )
        db.session.add(chat)
        db.session.commit()
        return chat

@ns.route("/group-chat/<int:id>")
class GroupChatById(Resource):
    
    @ns.marshal_with(group_chat_model)
    def get(self, id):
        chat = Group_Chat.query.get(id)
        return chat
    
    @ns.expect(group_chat_input_model)
    @ns.marshal_with(group_chat_model)
    def patch(self, id):
        chat = Group_Chat.query.get(id)
        
        if not chat:
            ns.abort(401, message="group chat not found")
        
        for key, value in ns.payload.items():
            setattr(chat, key, value)
            
        db.session.commit()
        
        return chat
    
    @ns.expect(group_chat_input_model)
    @ns.marshal_with(group_chat_model)
    def put(self, id):
        chat = Group_Chat.query.get(id)
        chat.group_id= ns.payload["group_id"],
        chat.sender= ns.payload["sender"],
        chat.chat= ns.payload["chat"]
        db.session.commit()
        return chat
    
    
    def delete(self, id):
        chat = Group_Chat.query.get(id)
        db.session.delete(chat)
        db.session.commit()
        
        return {}, 201

@ns.route("/login")
class Login(Resource):
    
    @ns.expect(login_input)
    def post(self):
        username = ns.payload['username']
        password = ns.payload['password']

        user = User.query.filter_by(username=username).first()

        if user:
            if bcrypt.check_password_hash(user.password, password):
                token = jwt.encode(
                    {
                        'id': user.id,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=120)
                    },
                    app.config['SECRET_KEY'],
                    algorithm='HS256'
                )
                return make_response(jsonify({'message': 'Login successful', 'token': token, 'id': user.id}), 200)
            else:
                return make_response(jsonify({'message': 'Login failed', 'error': 'Invalid email or password'}), 404)
        else:
            return make_response(jsonify({'message': 'Login failed', 'error': 'User not found'}), 404)


api.add_namespace(ns)

if __name__ == '__main__':
    app.run(debug=True, port = 5555)