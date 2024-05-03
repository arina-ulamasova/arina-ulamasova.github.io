from flask import Flask, render_template, url_for, request
import requests

app = Flask(__name__)

@app.route('/index.html')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about.html')
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/solutions.html')
@app.route('/solutions')
def solutions():
    return render_template('solutions.html')

@app.route('/gpt.html')
@app.route('/gpt')
def gpt():
    return render_template('gpt.html')

@app.route('/generate_response', methods=['POST'])
def generate_response():
    prompt = request.form['prompt']

    prompt_data = {
        "modelUri": "gpt://b1ghqjtt3mk2r9o1vjet/yandexgpt-lite",
        "completionOptions": {
            "stream": False,
            "temperature": 0.6,
            "maxTokens": "2000"
        },
        "messages": [
            {
                "role": "system",
                "text": "Привет, чем могу вам помочь?"
            },
            {
                "role": "user",
                "text": prompt
            }
        ]
    }

    url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Api-Key AQVNzLcRtfIon3vP9Wx-_Do-0EADDrFMELVjSpYe"
    }

    response = requests.post(url, headers=headers, json=prompt_data)
    result_json = response.json()

    # Extracting the text from the JSON response
    result_text = result_json['result']['alternatives'][0]['message']['text']

    return render_template('result.html', result=result_text)


if __name__ == '__main__':
    app.run(debug=True)
