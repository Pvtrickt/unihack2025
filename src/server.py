from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Allow Vite frontend

@app.route('/create-file', methods=['POST'])
def create_file():
    try:
        data = request.json
        filter_option = data.get("filter_option")
        budget = data.get("budget")
        serving = data.get("servings")
        diet_requirements = data.get("diet_requirements", [])

        if not filter_option:
            return jsonify({"error": "No file name provided"}), 400

        # Ensure file has a .txt extension
        file_name = f"request.txt"
        file_path = os.path.join(os.getcwd(), file_name)

        # Write content to the file
        with open(file_path, "w") as f:
            f.write(f"Cuisine Option: {filter_option} \nCost per serving: {budget} \nServing size: {serving}")
            f.write(f"\nDietary Requirements: {', '.join(diet_requirements) if diet_requirements else 'None'}\n")

        return jsonify({"message": f"File '{file_name}' created successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)  # Keep using port 5000
