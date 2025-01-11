import sqlite3

class Database:
    def __init__(self, db_path="test.db"):
        self.db_path = db_path

    def execute_query(self, query, params=None):
        connection = sqlite3.connect(self.db_path)
        cursor = connection.cursor()
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        rows = cursor.fetchall()
        connection.commit()
        connection.close()
        return rows
