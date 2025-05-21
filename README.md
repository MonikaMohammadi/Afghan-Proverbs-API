📦 Project Description
This API allows you to:

Store proverbs in Dari, Pashto, and English

Include meanings and categories (e.g., wisdom, advice)

Perform CRUD operations (Create, Read, Update, Delete)

Built with:

Node.js + Express

JSON file as storage (easy to replace with a database later)

RESTful endpoints
🚀 How to Run the Project Locally
Backend (API)
1. Clone the repository

git clone https://github.com/MonikaMohammadi/Afghan-Proverbs-API.git
cd Afghan-Proverbs-API
2. Install Dependencies

npm install

3. Run the Server
   node index.js
   
4. Test the API
   Use tools like Postman or curl to send requests to:
   http://localhost:3000/api/proverbs

   Frontend
The frontend application provides a user-friendly interface to interact with the Afghan Proverbs API. It allows users to:

View a list of proverbs with translations and categories

Add new proverbs

Edit existing proverbs

Delete proverbs

See alert messages for successful or failed operations

How to run the frontend
1. Navigate to the frontend directory (if separate) or ensure dependencies are installed in the frontend folder:
cd afghan-proverbs-frontend
npm install

2. Start the frontend development server (assuming it's a Vue.js app):
npm run serve

3. Open your browser and go to:
   http://localhost:8080

Make sure the backend API server is running at http://localhost:3000 so the frontend can communicate with it.

