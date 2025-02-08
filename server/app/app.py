#server/app/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime


# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

# Define the Product model outside of create_app()
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)

class Promotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    link = db.Column(db.String(300), nullable=True)
    bg_color = db.Column(db.String(20), nullable=False)  # Background color for the promotion (red, yellow, etc.)
    text_color = db.Column(db.String(20), nullable=False)

class Testimonial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(120), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # rating out of 5
    date = db.Column(db.DateTime, default=datetime.utcnow)
    image_url = db.Column(db.String(300), nullable=True)

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    with app.app_context():
        db.create_all()  # Ensures database tables exist

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
            image_url=data['image_url']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product added!'}), 201

    @app.route('/api/products/<int:id>', methods=['PUT'])
    def update_product(id):
        data = request.get_json()
        product = Product.query.get(id)
        if product:
            product.name = data['name']
            product.description = data['description']
            product.price = data['price']
            product.image_url = data['image_url']
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


    # Add a new API endpoint to fetch testimonials
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


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
