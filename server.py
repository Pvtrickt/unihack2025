from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

import chefff

app = Flask(__name__, static_folder="./dist/", static_url_path="/") 

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


@app.route('/', methods=['GET'])
def home():
    return send_from_directory(app.static_folder, "index.html")

# Serve favicon
@app.route('/favicon.ico')
def favicon():
    return jsonify({"message": "STOP FAVICON"}), 200

@app.route('/create-file', methods=['POST'])
def create_file():
    try:
        data = request.json
        # print(data)
        filter_option = data.get("filter_option")
        budget = data.get("budget")
        serving = data.get("servings")
        diet_requirements = data.get("diet_requirements", [])
        food_allergies = data.get("food_allergies")
        additional_requirements = data.get("additional_requirements")


        result = chefff.generateRecipes(
            cuisine=filter_option,
            allergies=food_allergies, 
            numServings=serving, 
            totalBudget=budget, 
            dietaryReqs=diet_requirements, 
            # additional_requirements=additional_requirements,
            remarks=additional_requirements
        )

        return jsonify({"message": f"{result}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()