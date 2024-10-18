# SmartChef: AI-Driven Recipe Suggester

## Project Overview:
SmartChef is an AI-powered full-stack recipe suggestion platform that generates personalized recipes based on user inputs such as ingredients, cooking time, and meal type.

## Tools & Technologies Used:
- **Backend:** Flask, RESTful API, LLM, Google Generative AI, Gemini API, Flask-CORS
- **Frontend:** React JS, Fetch API, Tailwind CSS, JavaScript, HTML
- **Data Handling:** JSON, Error handling

## Key Features:
- Real-time, customized recipe suggestions based on available ingredients,preferred cooking time, and mealtype like breakfast/lunch etc.
- AI integration for enhanced decision-making and user experience.
- Helps minimize food waste through efficient ingredient use.

## Project Structure:
- **frontend-react/**: Contains all React frontend files.
- **backend-flask/**: Contains Flask backend files and AI integration logic.

## How to Run the Project Locally

### Prerequisites:
- Node.js(for React frontend)
- Optional :Vite if want to launch react app through Vite (native create react app command load unnecessary resouces and time )
- Python (for Flask backend)
- API Key for Google Generative AI (for Gemini API)

### Running the Frontend

1. Navigate to the `frontend-react/` directory:
- launch react app through npm run dev or npm start 
2. Navigate to the 'backend-flask/' directory:
- Install the Gemini API SDK:The Python SDK for the Gemini API is contained in the google-generativeai package. 
- Install the dependency using pip:pip install -U google-generativeai
- Set up your API key:To use the Gemini API, you'll need an API key. If you don't already have one, create a key in Google AI Studio.
- Then, configure your key: It is strongly recommended that you do not check an API key into your version control system but assign it as an environment variable instead:export API_KEY=<YOUR_API_KEY>
3. Run the backend server - naviagte to 'backend-flask/' directory : Give command $ flask --app serverFlask run
- Your server should run on this address and port:Running on http://127.0.0.1:5000
4. Now both front end and backend server is running and you can use the project to get your favourite Indian Recipe using custom inputs , assuming you have basic spices present. Enjoy the meal !! 
