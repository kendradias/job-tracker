powershell# Navigate to the project directory (if you're not already there)
cd job-tracker

# Install backend dependencies
cd backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install --save-dev nodemon

# Update package.json scripts section
# You'll need to manually add these to your package.json:
# "scripts": {
#   "start": "node src/server.js",
#   "dev": "nodemon src/server.js"
# }

# Install frontend dependencies
cd ../frontend
npx create-react-app . --template typescript
npm install axios react-router-dom formik yup date-fns
npm install --save-dev tailwindcss postcss autoprefixer

# Initialize Tailwind CSS (optional, if you want to use it)
npx tailwindcss init -p

# Return to project root
cd ..

# Optional: Initialize git repository
git init