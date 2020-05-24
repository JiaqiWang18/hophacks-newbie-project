import sys
import secrets
import bcrypt
from getpass import getpass

from pymongo import MongoClient
import json


# Python script that generates settings for prod or dev environment

if (len(sys.argv) != 2 or sys.argv[1] not in ['prod', 'dev']):
    print("Usage: 'python config.py dev' or 'python config.py prod'")
    exit(1)

settings = {}



# TODO mongo username and password?
settings['debug'] = True
settings['MONGO_URI'] = 'mongodb://localhost:27017'
settings['MONGO_DB_NAME'] = 'hophacks'

settings['SECRET_KEY'] = 'pineapple pizza'

if (sys.argv[1] == 'prod'):
    settings['debug'] = False

    # Ask for Mongo info
    url = input("MongoDB url (leave empty for 'mongodb://localhost:27017'): ")
    if (len(url) > 0):
        settings['MONGO_URI'] = url

    # Generate a secret key for JWT
    printf("Generating secret key for JWT Tokens")
    settings['SECRET_KEY'] = secrets.token_urlsafe()


username = input("Admin account username (leave blank for 'admin'): " )
if not username:
    username = 'admin'



def setup_admin():
    password = getpass("Admin account password: ")
    if (len(password) < 4):
        print("Please enter a password at least 4 characters long")
        exit(1)
    if (password != getpass("Reenter passowrd: ")):
        print("Passwords do not match!")
        exit(1)

    with MongoClient(settings['MONGO_URI']) as client:
        db = client['hophacks']

        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode(), salt)

        if (db.users.find_one({'username': username})):
            print('User {} already exists! Skipping account creation'.format(username))
            return

        db.users.insert_one({
            'username': username,
            'hashed': hashed,
            'refresh_tokens': [],
            'profile': {},
            'is_admin' : True
        })

print("Adding admin account to database located at {} with username '{}'"
    .format(settings['MONGO_URI'], username))
setup_admin()

with open('settings.json', 'w') as file:
    json.dump(settings, file, indent=4)