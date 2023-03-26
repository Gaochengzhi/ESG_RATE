from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
other_esg_file = "其他ESG 评分-2022.xlsx"
wind_esg_file = "Wind评分-2022.xlsx"
other_esg_df1 = pd.read_excel(other_esg_file, sheet_name=0, engine="openpyxl")
other_esg_df2 = pd.read_excel(other_esg_file, sheet_name=1, engine="openpyxl")
wind_esg_df = pd.read_excel(wind_esg_file, engine="openpyxl")


def get_highest_esg_rating(ratings):
    rating_order = ["C", "CC", "CCC", "B", "BB", "BBB", "A", "AA", "AAA"]
    return max(ratings, key=lambda x: rating_order.index(x))


def get_esg_info(company_name):
    strl = len(company_name)
    huazheng_esg = other_esg_df1.loc[
        other_esg_df1.iloc[:, 1].str.startswith(company_name[:strl]),
        other_esg_df1.columns[3],
    ]
    pengbo_esg = other_esg_df1.loc[
        other_esg_df1.iloc[:, 1].str.startswith(company_name[:strl]),
        other_esg_df1.columns[4],
    ]
    luo_esg = other_esg_df2.loc[
        other_esg_df2.iloc[:, 1].str.startswith(company_name[:2]),
        other_esg_df2.columns[2],
    ]
    wind_esg_rating = wind_esg_df.loc[
        wind_esg_df.iloc[:, 1].str.startswith(company_name[:strl]),
        wind_esg_df.columns[2],
    ]
    wind_esg_score = wind_esg_df.loc[
        wind_esg_df.iloc[:, 1].str.startswith(company_name[:strl]),
        wind_esg_df.columns[6],
    ]

    if not huazheng_esg.empty:
        huazheng_esg = get_highest_esg_rating(huazheng_esg)
    else:
        huazheng_esg = "N/A"

    if not pengbo_esg.empty:
        pengbo_esg = max(pengbo_esg.dropna())
    else:
        pengbo_esg = "N/A"

    if not luo_esg.empty:
        luo_esg = max(luo_esg)
    else:
        luo_esg = "N/A"

    if not wind_esg_rating.empty:
        wind_esg_rating = wind_esg_rating.iloc[0]
    else:
        wind_esg_rating = "N/A"

    if not wind_esg_score.empty:
        wind_esg_score = wind_esg_score.iloc[0]
    else:
        wind_esg_score = "N/A"

    return {
        "company_name": company_name,
        "huazheng_esg": huazheng_esg,
        "pengbo_esg": pengbo_esg,
        "luo_esg": luo_esg,
        "wind_esg_rating": wind_esg_rating,
        "wind_esg_score": wind_esg_score,
    }


@app.route("/esg", methods=["GET"])
def esg_info():
    company_name = request.args.get("company_name")
    if not company_name:
        return jsonify({"error": "No company name provided"})
    esg_info = get_esg_info(company_name)
    # news_list = spider.getnews(company_name)
    return jsonify(esg_info)


if __name__ == "__main__":
    app.run(port=8000, host="0.0.0.0")
