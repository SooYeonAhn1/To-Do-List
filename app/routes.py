from flask import request, flash, redirect, render_template
from flask_login import login_user
from app import app, db
from app.models import User
from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect('/todos')
        else:
            flash('Invalid username or password')
            return redirect('/login')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username already exists. Please choose another.')
            return redirect('/register')

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash('Account created. You can now log in.')
        login_user(new_user)
        return redirect('/todos')
    
    return render_template('register.html')

@app.route('/todos')
def todo():
    return render_template('todos.html')