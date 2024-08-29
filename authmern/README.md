Installation
-Clone the repository:
git clone https://github.com/Kuzma02/MERN-Login-And-Register-With-JSON-Web-Token.git
-Install dependencies: Navigate to the project directory:
cd folder-name
-Install backend dependencies:
npm install
-Install frontend dependencies:
cd client
npm install
-Configure MongoDB and JWT: Visit MongoDB website, create account, database and take connection string. After that generate 256 bits random key and add it to .env file. Create the .env file in the root directory with the following contents:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
-Run the application: Start the backend server:
node app.js
-In a new terminal, start the frontend:
cd client
npm run dev


finally,
 visit http://localhost:5173 in your browser
