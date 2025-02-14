import os
from flask import Flask, request, jsonify,session, redirect, url_for
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime,timedelta
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash
import jwt
from functools import wraps





db = SQLAlchemy()
migrate = Migrate()

# Admin User model
class Admin(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)


#  Product model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)
    ring_size_options = db.Column(db.JSON, nullable=True)
    finishing_options = db.Column(db.JSON, nullable=True)
    more_details = db.Column(db.String(1000), nullable=True)
    sales = db.relationship('Sale', backref='product', lazy=True)


class Promotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    link = db.Column(db.String(300), nullable=True)
    bg_color = db.Column(db.String(20), nullable=False)
    text_color = db.Column(db.String(20), nullable=False)

class Testimonial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(120), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    image_url = db.Column(db.String(300), nullable=True)


class Sale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    sale_date = db.Column(db.DateTime, default=datetime.utcnow)
    revenue = db.Column(db.Float, nullable=False)

class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager = LoginManager()
    login_manager.init_app(app)
    CORS(app, resources={r'/*': {'origins': '*'}})

    with app.app_context():
        db.create_all()


    @login_manager.user_loader
    def load_user(user_id):
        return Admin.query.get(int(user_id))

    def generate_token(admin):
        token = jwt.encode(
            {'user_id': admin.id, 'exp': datetime.utcnow() + timedelta(hours=1)},
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        return token

    # Admin login route (returns a JWT)
    @app.route('/admin/login', methods=['POST'])
    def admin_login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        admin = Admin.query.filter_by(email=email).first()
        if admin and check_password_hash(admin.password, password):
            token = generate_token(admin)
            return jsonify({"token": token}), 200
        return jsonify({"message": "Invalid credentials"}), 401

    # Token validation
    def token_required(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = None
            if 'Authorization' in request.headers:
                token = request.headers['Authorization'].split(" ")[1]

            if not token:
                return jsonify({'message': 'Token is missing!'}), 403

            try:
                decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                current_user = Admin.query.get(decoded_token['user_id'])
            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token has expired!'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Invalid token!'}), 401

            return f(current_user, *args, **kwargs)
        return decorated_function

    # Admin logout route
    @app.route('/admin/logout', methods=['POST'])
    @login_required
    def admin_logout():
        logout_user()
        return jsonify({"message": "Logged out successfully"}), 200

    # Admin dashboard route (protected)
    @app.route('/admin/dashboard', methods=['GET'])
    @token_required
    def admin_dashboard(current_user):
        return jsonify({"message": f"Welcome to the admin dashboard, {current_user.email}"}), 200


    @app.route('/api/products', methods=['GET'])
    def get_products():
        products = Product.query.all()
        return jsonify([{
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'image_url': p.image_url
        } for p in products])

    @app.route('/api/products', methods=['POST'])
    def add_product():
        data = request.get_json()
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            image_url=data['image_url'],
            ring_size_options=data.get('ring_size_options', []),
            finishing_options=data.get('finishing_options', []),
            more_details=data.get('more_details', '')
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product added!'}), 201

    @app.route('/api/products/<int:id>', methods=['GET'])
    def get_product(id):
        product = Product.query.get(id)
        if product:
            return jsonify({
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'image_url': product.image_url,
                'ring_size_options': product.ring_size_options,
                'finishing_options': product.finishing_options,
                'more_details':product.more_details
            })
        return jsonify({'message': 'Product not found'}), 404


    @app.route('/api/products/<int:id>', methods=['PUT'])
    def update_product(id):
        data = request.get_json()
        product = Product.query.get(id)
        if product:
            product.name = data.get('name', product.name)
            product.description = data.get('description', product.description)
            product.price = data.get('price', product.price)
            product.image_url = data.get('image_url', product.image_url)
            product.ring_size_options = data.get('ring_size_options', product.ring_size_options)
            product.finishing_options = data.get('finishing_options', product.finishing_options)
            product.more_details = data.get('more_details', product.more_details)
            db.session.commit()
            return jsonify({'message': 'Product updated!'}), 200
        return jsonify({'message': 'Product not found'}), 404

    @app.route('/api/products/<int:id>', methods=['DELETE'])
    def delete_product(id):
        product = Product.query.get(id)
        if product:
            db.session.delete(product)
            db.session.commit()
            return jsonify({'message': 'Product deleted!'}), 200
        return jsonify({'message': 'Product not found'}), 404

    @app.route('/api/promotions', methods=['GET'])
    def get_promotions():
        promotions = Promotion.query.all()
        return jsonify([{
            'id': p.id,
            'title': p.title,
            'description': p.description,
            'link': p.link,
            'bg_color': p.bg_color,
            'text_color': p.text_color
        } for p in promotions])


    # testimonials
    @app.route('/api/testimonials', methods=['GET'])
    def get_testimonials():
        testimonials = Testimonial.query.all()
        return jsonify([{
            'id': t.id,
            'customer_name': t.customer_name,
            'review': t.review,
            'rating': t.rating,
            'date': t.date.strftime('%Y-%m-%d'),
            'image_url':t.image_url
        } for t in testimonials])



    @app.route('/api/analytics/sales', methods=['GET'])
    @token_required
    def get_sales_analytics(current_user):
        sales = Sale.query.filter(Sale.sale_date >= datetime.utcnow() - timedelta(days=30)).all()
        sales_data = [{
            'date': sale.sale_date.strftime('%Y-%m-%d'),
            'revenue': sale.revenue,
            'product_id': sale.product_id,
            'quantity': sale.quantity
        } for sale in sales]
        return jsonify(sales_data), 200

    @app.route('/api/analytics/inventory', methods=['GET'])
    @token_required
    def get_inventory_status(current_user):
        inventory = Inventory.query.all()
        inventory_data = [{
            'product_id': item.product_id,
            'stock_quantity': item.stock_quantity,
            'last_updated': item.last_updated.strftime('%Y-%m-%d')
        } for item in inventory]
        return jsonify(inventory_data), 200

    @app.route('/api/analytics/product-comparison', methods=['GET'])
    @token_required
    def get_product_comparison(current_user):
        products = Product.query.all()
        comparison_data = [{
            'product_id': product.id,
            'product_name': product.name,
            'total_sales': sum(sale.quantity for sale in product.sales),
            'total_revenue': sum(sale.revenue for sale in product.sales)
        } for product in products]
        return jsonify(comparison_data), 200

    return app

