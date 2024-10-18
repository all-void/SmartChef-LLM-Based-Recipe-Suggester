
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

# Configure the API key
genai.configure(api_key=os.environ["API_KEY"])

app = Flask(__name__)
cors=CORS(app,origins='*')

def recipe_suggester(ingredients,cookingTime,mealType):
    print("hello")
    s = '+'.join(ingredients)  # Ingredients ko string me convert karna
    # print("hello")
    print(s)
    final_prompt = (
        f"Tell me the easiest and delicious Indian food recipe using some constraints I am going to mention ahead. "
        + f"You can use very basic and common spices found in Indian homes. Ingredients are: {s}.Cooking time is :{cookingTime}.Meal Type is :{mealType} "
        + f"Give response in bullet points."
    )
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    try:
        response = model.generate_content(f"{final_prompt}")  # OpenAI API call
        return response.text
    except Exception as e:
        return f"Error occurred while fetching recipe: {str(e)}"


@app.route("/submit-ingredients", methods=['POST'])
def suggestRecipe():
    try:
        data = request.get_json()  # JSON request se data lo
        print(data)
        if not data:
            return jsonify({"error": "Unable to generate Recipe as server can't recive submiited details.Please try again"}), 400  # Bad Request error

        ingredients = data.get('ingredients', [])  # Ingredients list lo
        print(ingredients)
        cookingTime=data.get('cookingTime','')
        print(cookingTime)
        mealType=data.get('mealType','')
        print(mealType)

        if not ingredients:  # Check if ingredients are empty
            return jsonify({"error": "Ingredients list is empty.Please fill it and try again."}), 400

        recipe = recipe_suggester(ingredients,cookingTime,mealType)    
        print(recipe)
        return jsonify({"serverfinalrecipe": f"{recipe}"})  # Recipe ko JSON format me bhejna

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Internal Server Error


@app.route("/")
def homepage():
    return "<h1>Server Running</h1>"

if __name__ == '__main__':
    app.run(debug=True)

