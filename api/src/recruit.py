from db import db
from flask import Blueprint, request, Response, current_app, render_template, jsonify, Flask
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId

recruiting_api = Blueprint('recruitments', __name__)


@recruiting_api.route('/', methods=['GET'])
def get():
    posts = list(db.recruitments.find({}, {'_id': False}))
    print(posts)
    return jsonify({"posts": posts}), 200


@recruiting_api.route('/', methods=['POST'])
@jwt_required
def create():
    """
    {
        "num_people_wanted": 2,
        "role_needed": "frontend, backend",
        "project_description": "A website for a startup",
        "contact_email": "123@example.com",
        "other_info": "something else"
    }
    """

    id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(id)})
    if user is None:
        return jsonify({"msg": "user not found?"}), 404

    db.recruitments.insert_one({
        'num_people_wanted': request.json.get('num_people_wanted', None),
        'role_needed': request.json.get('role_needed', ""),
        'project_description': request.json.get('project_description', ""),
        'contact_email': request.json.get('contact_email', None),
        'other_info': request.json.get('other_info', None),
        'first_name': user['profile']['first_name'],
        'last_name': user['profile']['last_name'],
        'phone_number': user['profile']['phone_number']
    })

    return jsonify({"msg": "success"}), 200
