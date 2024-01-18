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
    
    for _ in range(100):
        user = User(
            first_name= fake.first_name(),
            last_name= fake.last_name(),
            username = fake.username(),
            phone_no= fake.phone_number(),
            profile = f'https://dummyimage.com/200x200/{random.randint(10, 100000)}',
            about = fake.text,
            email= fake.email,
            password = 'helloworld'
        )
        users.append(user)
        
    db.session.add_all(users)
    db.session.commit()
    
    print('🦸‍♀️ Seeding Chats')
    
    
