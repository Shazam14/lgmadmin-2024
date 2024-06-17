import psycopg2

try:
    connection = psycopg2.connect(
        dbname="lgmsdb",
        user="postgres",
        password="postgres",
        host="host.docker.internal",
        port="5432"
    )
    cursor = connection.cursor()
    cursor.execute("SELECT 1;")
    print("Database connection successful")
except Exception as e:
    print(f"Database connection failed: {e}")
finally:
    if connection:
        cursor.close()
        connection.close()
