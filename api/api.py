from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
import joblib
import time
from dotenv import load_dotenv
import numpy as np
import pandas as pd
import os
from fractions import Fraction
from pyDecision.algorithm import ahp_method, topsis_method, fuzzy_topsis_method


UPLOAD_FOLDER = os.path.join('staticFiles', 'uploads')
app = Flask(__name__)

load_dotenv('./.flaskenv')
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def convert_dataset(dataset):
    converted_dataset = []
    for row in dataset.itertuples(index=False):
        converted_row = []
        # Convert numerical values into fuzzy sets
        for value in row:
            if value <= 10:
                converted_row.append((value, value+4, value+8))
            else:
                converted_row.append((value-4, value, value+4))
        converted_dataset.append(converted_row)
    return converted_dataset

def map_linguistic_to_weights(linguistic_values, weights):
    fuzzy_weights = []
    for criterion_weights in weights:
        fuzzy_criterion_weights = []
        for weight in criterion_weights:
            fuzzy_criterion_weights.append(tuple(linguistic_values[weight]))
        fuzzy_weights.append(fuzzy_criterion_weights)
    return fuzzy_weights

linguistic_values = {
    'VL': [0, 0, 0.2],
    'L': [0, 0.2, 0.4],
    'M': [0.2, 0.4, 0.6],
    'H': [0.4, 0.6, 0.8],
    'VH': [0.6, 0.8, 1]
}

weights = [
    ['H','H','VL','VH','M','H']
]
weights = np.array(weights)
criterion_type = ['max', 'max', 'min', 'max', 'max', 'max']

@app.route('/api/v1/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}

@app.route("/api/v1/download")
def downloadFile():
    download_req_id = request.args.get('download_req_id')
    path = app.root_path
    video = path + '/' + "template.csv"
    return send_file(video, as_attachment=True)

@app.route('/api/v1/calculate', methods=['POST'])
def calculate():
    converted_dataset = []
    f = request.files['file']
    f.save(f.filename)
    dataset = pd.read_csv(f.filename)
    data = pd.read_csv(f.filename)
    print(dataset.columns)
    dataset = dataset.drop(columns=['Tekanan Udara Menurut Bulan (mb)'])
    dataset = dataset.drop(columns=['Bulan'])
    convert_data = convert_dataset(dataset)
    fuzzy_weights = map_linguistic_to_weights(linguistic_values, weights)
    converted_df = pd.DataFrame(convert_data)
    converted_df = np.array(converted_df)
    relative_closeness = fuzzy_topsis_method(converted_df, fuzzy_weights, criterion_type, graph=False)
    # Retrieve the alternatives (months) from the original data
    alternatives = data['Bulan'].tolist()
    # Reshape the TOPSIS result array
    result_reshaped = relative_closeness.reshape(-1)
    # Create a DataFrame with alternatives and TOPSIS result
    result_df = pd.DataFrame({'Alternatives': alternatives, 'Score': result_reshaped})
    # Sort the DataFrame by the "Score" column in descending order
    result_df_sorted = result_df.sort_values(by='Score', ascending=False)
    result_json = result_df_sorted.to_json(orient='records')
    return jsonify(result_json)
    return jsonify(converted_data=converted_data)

@app.route('/calculate_topsis', methods=['POST'])
def calculate_topsis():
    converted_df = np.array(request.json['converted_df'])
    weights = np.array(request.json['weights'])
    criterion_type = request.json['criterion_type']

    relative_closeness = fuzzy_topsis_method(converted_df, weights, criterion_type, graph=True)

    alternatives = request.json['alternatives']
    result_reshaped = relative_closeness.reshape(-1)
    result_df = pd.DataFrame({'Alternatives': alternatives, 'Score': result_reshaped})
    result_df_sorted = result_df.sort_values(by='Score', ascending=False)

    return jsonify(result_df_sorted=result_df_sorted.to_dict(orient='records'))

if __name__ == '__main__':
    app.run()