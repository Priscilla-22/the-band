# server/app/seed.py
from app import create_app, db, Product,Promotion,Testimonial,Admin, Sale, Inventory
from datetime import datetime,timedelta
from werkzeug.security import generate_password_hash
import random



# Sample admin data
admin_data = {
    "email": "admin@theband.com",
    "password": "admin"  # You will hash this password securely
}

# Sample products to add to the database
products = [
    {
        "name": "Laptop",
        "description": "A powerful laptop",
        "price": 999.99,
        "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036",
        "ring_size_options": ["Pick your size", "6", "7", "8", "9", "10"],
        "finishing_options": ["Shiny", "Matte", "Glossy"],
        "more_details": "This laptop is powered by the latest Intel Core i9 processor, offering lightning-fast speed and multitasking capabilities. It comes equipped with 16GB of RAM, ensuring smooth performance even during the most demanding tasks. The laptop boasts a high-resolution 15.6-inch display, perfect for watching movies, editing photos, and gaming. With its slim design and long-lasting battery, you can take it with you wherever you go. Whether you're a student, professional, or gamer, this laptop has everything you need to stay productive and entertained."
    },
    {
        "name": "Smartphone",
        "description": "A high-end smartphone",
        "price": 599.99,
        "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036",
        "ring_size_options": ["Pick your size", "16", "18", "20", "22"],
        "finishing_options": ["Shiny", "Matte", "Brushed"],
        "more_details": "Experience the latest in smartphone technology with the new high-end Smartphone. Featuring a 6.5-inch Super AMOLED display, the screen delivers crisp, vibrant colors and true blacks, perfect for viewing photos and videos. Powered by a fast processor and 8GB of RAM, it provides seamless multitasking and smooth gaming performance. The 12MP camera captures stunning photos, while the large battery ensures you stay connected all day long. This smartphone also supports 5G, making it future-proof and ready for the next generation of mobile connectivity."
    },
    {
        "name": "Headphones",
        "description": "Noise-cancelling headphones",
        "price": 199.99,
        "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036",
        "ring_size_options": ["Pick your size", "Small", "Medium", "Large"],
        "finishing_options": ["Shiny", "Matte"],
        "more_details": "These noise-cancelling headphones are designed to deliver an immersive audio experience. The advanced noise-canceling technology blocks out ambient sounds, allowing you to focus on your music, podcasts, or calls. The comfortable over-ear design ensures long-lasting wear without discomfort. With high-fidelity sound and deep bass, these headphones are perfect for audiophiles and casual listeners alike. The built-in microphone and touch controls make it easy to manage your music and calls without reaching for your device."
    },
    {
        "name": "Keyboard",
        "description": "Mechanical keyboard",
        "price": 89.99,
        "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036",
        "ring_size_options": ["Pick your size", "6", "7", "8", "9", "10"],
        "finishing_options": ["Shiny", "Matte", "Glossy"],
        "more_details": "This mechanical keyboard provides a satisfying typing experience with its responsive keys and audible feedback. The RGB backlighting adds a touch of flair to your workspace, with customizable colors and effects to match your style. The ergonomic design ensures comfort during long typing sessions, while the durable key switches ensure a long lifespan. Whether you're typing, gaming, or coding, this keyboard offers both style and performance, making it a must-have for any desk setup."
    },
    {
        "name": "Mouse",
        "description": "Ergonomic mouse",
        "price": 49.99,
        "image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2009-09-27.png?updatedAt=1738995042036",
        "ring_size_options": ["Pick your size", "Small", "Medium", "Large"],
        "finishing_options": ["Shiny", "Matte"],
        "more_details": "This ergonomic mouse is designed to provide comfort and precision for long hours of use. Its shape conforms to the natural curve of your hand, reducing strain on your wrist. The high-precision optical sensor ensures smooth tracking on various surfaces, making it perfect for work or gaming. The customizable buttons allow you to assign shortcuts for your favorite tasks, while the sleek design adds a modern touch to your workspace. Whether you're working from home or playing games, this mouse offers the perfect balance of comfort and functionality."
    }
]


# Sample promotions to add to the database
promotions = [
    {"title": "50% OFF!", "description": "Save big on Black Friday deals.", "link": "/offers", "bg_color": "bg-red-600", "text_color": "text-white"},
    {"title": "Buy 1 Get 1 Free!", "description": "Amazing offer on shoes & accessories.", "link": "/offers", "bg_color": "bg-yellow-400", "text_color": "text-black"},
    {"title": "Limited Time!", "description": "Get exclusive discounts this weekend.", "link": "/offers", "bg_color": "bg-green-500", "text_color": "text-white"},
    {"title": "Free Shipping", "description": "Enjoy free shipping on all orders above $50!", "link": "/offers", "bg_color": "bg-blue-500", "text_color": "text-white"}
]

# Sample testimonials to add to the database
testimonials = [
    {"customer_name": "John Doe", "review": "Great product, highly recommend!", "rating": 5, "date": datetime.utcnow(),"image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2012-26-56.png?updatedAt=1739006843261"},
    {"customer_name": "Jane Smith", "review": "Good quality, but a bit expensive.", "rating": 4, "date": datetime.utcnow(),"image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2012-26-56.png?updatedAt=1739006843261"},
    {"customer_name": "Sam Johnson", "review": "Not satisfied with the product, I expected better.", "rating": 2, "date": datetime.utcnow(),"image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2012-26-56.png?updatedAt=1739006843261"},
    {"customer_name": "Emily Davis", "review": "Amazing service and quality, will buy again!", "rating": 5, "date": datetime.utcnow(),"image_url": "https://ik.imagekit.io/lzdm7pnd7/Screenshot%20from%202025-02-08%2012-26-56.png?updatedAt=1739006843261"}
]


# Generate dummy sales data
def generate_sales_data():
    sales = []
    for i in range(1, 6):  # Assuming 5 products
        for day in range(30):  # Last 30 days
            quantity = random.randint(1, 10)
            product = Product.query.get(i)
            revenue = quantity * product.price
            sales.append({
                "product_id": i,
                "quantity": quantity,
                "revenue": revenue,
                "sale_date": datetime.utcnow() - timedelta(days=day)
            })
    return sales

# Generate dummy inventory data
def generate_inventory_data():
    inventory = []
    for i in range(1, 6):  # Assuming 5 products
        inventory.append({
            "product_id": i,
            "stock_quantity": random.randint(10, 100),
            "last_updated": datetime.utcnow()
        })
    return inventory



# Clear existing data
def clear_existing_data(app):
    with app.app_context():
        Product.query.delete()  # Remove all existing products
        Promotion.query.delete()
        Admin.query.delete()
        Sale.query.delete()
        Inventory.query.delete()
        db.session.commit()

def seed_db():
    app = create_app()  # Use create_app() to set up Flask properly

    # Clear existing data first if you need to start fresh
    clear_existing_data(app)

    # Insert new data
    with app.app_context():
        admin = Admin(
            email=admin_data["email"],
            password=generate_password_hash(admin_data["password"])  # Hash the password
        )
        db.session.add(admin)


        # Efficient bulk insert for large datasets
        db.session.bulk_insert_mappings(Product, products)
        db.session.bulk_insert_mappings(Promotion, promotions)
        db.session.bulk_insert_mappings(Testimonial, testimonials)

        # Add sales and inventory data
        sales_data = generate_sales_data()
        inventory_data = generate_inventory_data()
        db.session.bulk_insert_mappings(Sale, sales_data)
        db.session.bulk_insert_mappings(Inventory, inventory_data)

        db.session.commit()
        print("✅ Database seeded successfully!")

if __name__ == '__main__':
    seed_db()
