from flask import Flask, request, jsonify
import requests
import json
from bs4 import BeautifulSoup
from datetime import datetime
import re

from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

google_search_api_key = "AIzaSyBUN66xdp2JuA5kPhkMCGtqDFtJPi_fm5M"
google_search_engine_id = "07008532d295a427a"


def get_date_from_string(string):
    date_formats = [
        r"\b\d{4}-\d{1,2}-\d{1,2}\b",
        r"\b\d{4}年\d{1,2}月\d{1,2}日\b",
        r"\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}, \d{4}\b",
    ]

    for date_format in date_formats:
        date = re.search(date_format, string)
        if date:
            date = date.group(0)
            try:
                date = datetime.strptime(date, "%Y-%m-%d").strftime("%Y-%m-%d")
            except ValueError:
                try:
                    date = datetime.strptime(date, "%Y年%m月%d日").strftime("%Y-%m-%d")
                except ValueError:
                    date = datetime.strptime(date, "%b %d, %Y").strftime("%Y-%m-%d")
            break
    else:
        date = ""
    return date


def get_esg_news(company_name):
    url = f"https://www.googleapis.com/customsearch/v1?key={google_search_api_key}&cx={google_search_engine_id}&q={company_name}+ESG"
    response = requests.get(url)
    print(response)
    if response.status_code != 200:
        return []

    search_results = json.loads(response.text)
    news_list = []
    for result in search_results.get("items", []):
        title = result.get("title", "")
        link = result.get("link", "")
        content = result.get("htmlSnippet", "")
        snippet = BeautifulSoup(content, "html.parser").get_text()
        date = get_date_from_string(title)
        if not date:
            date = get_date_from_string(snippet)
        summary = snippet
        news_list.append((title, date, summary, link))

    return news_list


@app.route("/get_esg_news", methods=["POST"])
def get_esg_news_handler():
    company_name = request.get_json().get("company_name")
    news_list = get_esg_news(company_name)
    response = jsonify(news_list)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(port=8001, host="0.0.0.0")
