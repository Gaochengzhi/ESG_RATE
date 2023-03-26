from flask import Flask, request, jsonify
import requests
import re


from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

google_search_api_key = "AIzaSyBUN66xdp2JuA5kPhkMCGtqDFtJPi_fm5M"
google_search_engine_id = "07008532d295a427a"


def search_market_value(company_name):
    company_name = request.args.get("company_name")

    if not company_name:
        return {"error": "Missing company_name parameter"}, 400

    query = f"{company_name} 市值"

    response = requests.get(
        "https://www.googleapis.com/customsearch/v1",
        params={
            "key": google_search_api_key,
            "cx": google_search_engine_id,
            "q": query,
        },
    )

    if response.status_code != 200:
        return {
            "error": f"Google search API request failed with status {response.status_code}"
        }, response.status_code

    data = response.json()
    snippet = None

    for item in data.get("items", []):
        snippet = item.get("snippet")
        if snippet:
            break

    if not snippet:
        return {"error": "No search result found"}, 404

    pattern = re.compile(r"(\d+\.\d+)亿")
    match = pattern.search(snippet)

    if match:
        market_value = float(match.group(1)) * 100
        return {"market_value": market_value}
    else:
        return {"error": "Market value not found in search results"}, 404


@app.route("/get_market_value", methods=["GET"])
def get_market_value():
    company_name = request.args.get("company_name")
    if not company_name:
        return jsonify({"error": "Missing company_name parameter"}), 400

    market_value = search_market_value(company_name)
    if market_value is None:
        return jsonify({"error": "Market value not found"}), 404

    return jsonify({"market_value": market_value})


if __name__ == "__main__":
    app.run(debug=True, port=8002, host="0.0.0.0")
