# server/seed.py
from app import create_app, db, Product,Promotion

# Sample products to add to the database
products = [
    {"name": "Laptop", "description": "A powerful laptop", "price": 999.99, "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036"},
    {"name": "Smartphone", "description": "A high-end smartphone", "price": 599.99, "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036"},
    {"name": "Headphones", "description": "Noise-cancelling headphones", "price": 199.99, "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036"},
    {"name": "Keyboard", "description": "Mechanical keyboard", "price": 89.99, "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036"},
    {"name": "Mouse", "description": "Ergonomic mouse", "price": 49.99, "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036"}
]

# Sample promotions to add to the database
promotions = [
    {"title": "50% OFF!", "description": "Save big on Black Friday deals.", "link": "/offers", "bg_color": "bg-red-600", "text_color": "text-white"},
    {"title": "Buy 1 Get 1 Free!", "description": "Amazing offer on shoes & accessories.", "link": "/offers", "bg_color": "bg-yellow-400", "text_color": "text-black"},
    {"title": "Limited Time!", "description": "Get exclusive discounts this weekend.", "link": "/offers", "bg_color": "bg-green-500", "text_color": "text-white"},
    {"title": "Free Shipping", "description": "Enjoy free shipping on all orders above $50!", "link": "/offers", "bg_color": "bg-blue-500", "text_color": "text-white"}
]


# Clear existing data
def clear_existing_data(app):
    with app.app_context():
        Product.query.delete()  # Remove all existing products
        Promotion.query.delete()
        db.session.commit()

def seed_db():
    app = create_app()  # Use create_app() to set up Flask properly

    # Clear existing data first if you need to start fresh
    clear_existing_data(app)

    # Insert new data
    with app.app_context():
        # Efficient bulk insert for large datasets
        db.session.bulk_insert_mappings(Product, products)
        db.session.bulk_insert_mappings(Promotion, promotions)
        db.session.commit()
        print("✅ Database seeded successfully!")

if __name__ == '__main__':
    seed_db()
