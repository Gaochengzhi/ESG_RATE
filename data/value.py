import requests
from bs4 import BeautifulSoup

def get_market_cap(company_name):
    url = f"https://www.google.com/search?q={company_name} 市值"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    market_cap = None
    for element in soup.find_all('div', class_='op-stockdynamic-moretab'):
        if '市值' in element.text:
            market_cap = element.text.split('市值')[1].strip()
            break
    return market_cap

# 示例使用：
company_name = "阿里巴巴"
market_cap = get_market_cap(company_name)
print(f"{company_name}的市值是{market_cap}")

