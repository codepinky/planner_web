from flask import Blueprint, jsonify
import requests

# Criar o Blueprint para rotas de emojis
emoji_routes = Blueprint("emoji_routes", __name__)

# Configuração da API de Emojis
API_KEY = "d23cf996dd99b8d04ad2bea0ed98d450523d2609"
BASE_URL = "https://emoji-api.com/emojis"

def fetch_emoji_by_name(name):
    """Busca um emoji por nome usando a API de emojis."""
    try:
        response = requests.get(f"{BASE_URL}?access_key={API_KEY}")
        response.raise_for_status()
        all_emojis = response.json()
        emoji = next((e for e in all_emojis if name in e['slug']), None)
        return emoji['character'] if emoji else "❓"
    except Exception as e:
        print(f"Erro ao buscar emoji: {e}")
        return "❓"

@emoji_routes.route("/emojis", methods=["GET"])
def get_emojis():
    """Rota para retornar os emojis correspondentes aos tipos."""
    emojis = {
        "financeiro": fetch_emoji_by_name("money-bag"),
        "treinos": fetch_emoji_by_name("flexed-biceps"),
        "leituras": fetch_emoji_by_name("books"),
        "diario": fetch_emoji_by_name("memo"),
    }
    return jsonify(emojis)
