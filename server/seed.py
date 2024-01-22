from app import app
from faker import Faker
import random
from datetime import datetime

from models import db, User, Chat, Pair_chat, Group, Group_Chat, Group_Member

with app.app_context():
    
    # deleting the previous records in the database
    
    User.query.delete()
    Chat.query.delete()
    Pair_chat.query.delete()
    Group.query.delete()
    Group_Chat.query.delete()
    Group_Member.query.delete()
    
    db.session.commit()
    
    fake = Faker()
    
    print('🦸‍♀️ Seeding users...')
    
    users = []
    for _ in range(0, 100):
        user = User(
            first_name= fake.first_name(),
            last_name= fake.last_name(),
            username = fake.name(),
            phone_no= fake.phone_number(),
            profile = fake.image_url(),
            about = fake.sentence(),
            email= fake.email(),
            password = 'helloworld'
        )
        users.append(user)
        
    db.session.add_all(users)
    db.session.commit()
    
    print('🦸‍♀️ Seeding Chats')
    
    chats=[]
    for _ in range(1000):
        chat = Chat(
            chat = fake.text(max_nb_chars=80),
            sender= random.randint(1, 100)
        )
        chats.append(chat)
    
    db.session.add_all(chats)
    db.session.commit()
    
    
    print('🦸‍♀️ Seeding pair_chats...')
    
    pair_chats = []
    for _ in range(0, 900):
        pair_chat = Pair_chat(
            chat = fake.text(max_nb_chars=80),
            sender = random.randint(1, 100),
            receiver = random.randint(1, 100)
        )
        pair_chats.append(pair_chat)
    
    db.session.add_all(pair_chats)
    db.session.commit()

    print('🦸‍♀️ Seeding group...')
    
    groups = []
    for _ in range(0, 200):
        group = Group(
            name = fake.company(),
            admin_id = random.randint(1, 100),
            profile = fake.image_url(),
            description = fake.text()
        )
        groups.append(group)
        
    db.session.add_all(groups)
    db.session.commit()
    
    
    print('🦸‍♀️ Seeding group_member...')
    
    group_members = []
    for _ in range(0, 1000):
        group_member = Group_Member(
            group_id = random.randint(1, 200),
            member_id = random.randint(1, 100)
        )
        group_members.append(group_member)
    
    db.session.add_all(group_members)
    db.session.commit()
    
    print('🦸‍♀️ Seeding group_chats...')
    
    group_chats = []
    
    for _ in range(0, 2000):
        group_chat = Group_Chat(
            group_id  = random.randint(1, 200),
            sender = random.randint(1, 100),
            chat = fake.text(max_nb_chars=80)
        )
        group_chats.append(group_chat)
        
    db.session.add_all(group_chats)
    db.session.commit()
