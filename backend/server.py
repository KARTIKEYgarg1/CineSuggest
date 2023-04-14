from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from utils import getMoviesFromApi,showRecommendations,showReviews,get_actor_photo
app = Flask(__name__)
@app.route("/")
def index():
    return "prohibited::BACKEND"
@app.route('/search', methods=['POST'])
def search():
    search_term = request.form.get('searchTerm')
    with open('./recommendationSystem/array.bin', 'rb') as file:
        bin_data = file.read()
    arr = np.frombuffer(bin_data, dtype=np.float64)
    arr = arr.reshape((1000, 1000))
    df=pd.read_csv("./recommendationSystem/finaldata.csv")
    results = showRecommendations(df,arr,search_term)
    # results = getMoviesFromApi(results)
    return jsonify(results)
@app.route('/analyse', methods=['POST'])
# @app.route('/analyse')
def analyse():
    search_term = request.form.get('jsonArr')
    return showReviews(search_term)
@app.route('/get_actor_photo', methods=['GET'])
def getPic():
    actor_name = request.args.get('name')
    return get_actor_photo(actor_name)
if __name__ == '__main__':
    app.run(debug=True)
