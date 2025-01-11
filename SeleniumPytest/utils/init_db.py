import sqlite3

# Create or connect to the database
conn = sqlite3.connect("test.db")

# Create a cursor object
cursor = conn.cursor()

# Create the users table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)
""")

# Insert test data
users = [
    ("tomsmith", "SuperSecretPassword!"),
    ("admin", "adminpass"),
    ("invalid_user", "wrongpass")
]

cursor.executemany("INSERT INTO users (username, password) VALUES (?, ?)", users)

# Commit changes and close connection
conn.commit()
conn.close()

print("Database initialized successfully!")
