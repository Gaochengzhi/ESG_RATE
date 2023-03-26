from flask import Flask, request, jsonify
import requests
import re

app = Flask(__name__)

google_search_api_key = "AIzaSyBUN66xdp2JuA5kPhkMCGtqDFtJPi_fm5M"
google_search_engine_id = "07008532d295a427a"

def search_market_value(company_name):
    query = f"{company_name} 市值"
    url = f"https://www.googleapis.com/customsearch/v1?key={google_search_api_key}&cx={google_search_engine_id}&q={query}"
    response = requests.get(url)
    data = response.json()

    if 'items' not in data:
        return None

    for item in data['items']:
        snippet = item['snippet']
        match = re.search(r"市值\s*([0-9]+(\.[0-9]+)?)(亿|百万)", snippet)
        if match:
            market_value = float(match.group(1))
            unit = match.group(3)
            if unit == "亿":
                market_value *= 100  # Convert to hundreds of millions of yuan
            elif unit == "百万":
                market_value /= 10  # Convert to hundreds of millions of yuan
            return market_value

    return None

@app.route('/get_market_value', methods=['GET'])
def get_market_value():
    company_name = request.args.get('company_name')
    if not company_name:
        return jsonify({"error": "Missing company_name parameter"}), 400

    market_value = search_market_value(company_name)
    if market_value is None:
        return jsonify({"error": "Market value not found"}), 404

    return jsonify({"market_value": market_value})

if __name__ == '__main__':
    app.run(debug=True,port=8002, host='0.0.0.0')

