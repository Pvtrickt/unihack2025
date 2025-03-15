from flask import Flask, request, jsonify
from flask_cors import CORS
import os

import chefff

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Allow Vite frontend

@app.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Flask server is running!"}), 200


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

        return jsonify({"message": f"Generated recipes successfull {result}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)  # Keep using port 5000
