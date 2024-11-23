from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import mysql.connector
from emoji_routes import emoji_routes  # Importa o Blueprint das rotas de emojis

app = Flask(__name__)

# Configurar CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

bcrypt = Bcrypt(app)

# Configuração do Banco de Dados
db_config = {
    'host': 'data-img.cf4444qaq92y.us-east-2.rds.amazonaws.com',
    'user': 'admin',
    'password': 'mano0990',
    'database': 'user_auth'
}

# Rota para registro de usuário
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return jsonify({"error": "Todos os campos são obrigatórios"}), 400

    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO users (username, password_hash, email) VALUES (%s, %s, %s)",
            (username, password_hash, email),
        )
        conn.commit()

        return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

    except mysql.connector.Error as err:
        if err.errno == 1062:
            return jsonify({"error": "Usuário ou email já cadastrado"}), 409
        return jsonify({"error": f"Erro no banco de dados: {str(err)}"}), 500

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

# Rota para login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if user and bcrypt.check_password_hash(user['password_hash'], password):
            return jsonify({"message": "Login realizado com sucesso!"}), 200
        else:
            return jsonify({"error": "Credenciais inválidas"}), 401

    except mysql.connector.Error as err:
        return jsonify({"error": f"Erro no banco de dados: {str(err)}"}), 500

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

# Registrar o Blueprint de emojis
app.register_blueprint(emoji_routes)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
