# Afghan Proverbs & Sayings API 

A RESTful API for storing and managing traditional Afghan proverbs in Dari, Pashto, and English.

---

## 📦 Project Description

This API allows you to:
- Store proverbs in Dari, Pashto, and English
- Include meanings and categories (e.g., wisdom, advice)
- Perform CRUD operations (Create, Read, Update, Delete)

Built with:
- Node.js + Express
- JSON file as storage (easy to replace with a database later)
- RESTful endpoints

---

## 🚀 How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/MonikaMohammadi/Afghan-Proverbs-API.git
cd Afghan-Proverbs-API

### 2. Install Dependencies
npm install

### 3. Create the Data File
In the data folder, create a file named proverbs.json and initialize it with an empty array:
[]

### 4. Run the Server
node index.js

You should see: 🚀 Server running at http://localhost:3000


### 5. Test the API
Use tools like Postman or curl to send requests to:
http://localhost:3000/proverbs

You can perform CRUD operations on Afghan proverbs in Dari, Pashto, and English.
