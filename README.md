# 💰 SpendSmart - Intelligent Expense Tracker

**SpendSmart** is a modern, full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js). It goes beyond simple logging by integrating **AI-powered insights** to give you real-time feedback on your spending habits, along with professional reporting tools.

## 🚀 Key Features

### 🧠 AI Financial Advisor
-   **Smart Analysis**: Automatically analyzes your spending patterns to provide personalized financial advice (e.g., "High Food Spending").
-   **Intelligent Fallback**: Works perfectly even without an API key! The system uses advanced heuristics to calculate detailed insights from your actual data if the AI service is unavailable.
-   **Interactive Dashboard**: View insights directly on your dashboard with "Warning", "Tip", and "Praise" categories.

### 📊 Comprehensive Expense Management
-   **Modern Floating UI**: A beautiful, card-based interface for adding expenses with intuitive icons and floating labels.
-   **Dynamic Currency Support**: Seamlessly switch between **INR (₹), USD ($), EUR (€), and GBP (£)** instantly across the entire app.
-   **Visual List**: Clean, readable list of all your expenses with color-coded category tags (Health, Food, Entertainment, etc.).

### 📄 Professional Reporting
-   **PDF Export**: Generate professional-grade PDF reports of your expenses with a single click.
-   **Auto-Formatted Tables**: Your data is meant to be shared. The PDF includes perfectly aligned tables with currency symbols handled correctly (e.g., using "Rs." for compatibility).

### 🛡️ Secure & User-Friendly
-   **Full Authentication**: Secure Login and Registration system using JWT and Bcrypt.
-   **Profile Control**: Users have full control, including a **Delete Profile** feature to permanently remove their account and data.
-   **Responsive Design**: A fully responsive "Hero" landing page and dashboard that looks great on desktop and mobile.

---

## 🛠️ Tech Stack

-   **Frontend**: React (Hooks, Context API), React Router v6, CSS3 (Variables, Flexbox/Grid)
-   **Backend**: Node.js, Express.js, REST API
-   **Database**: MongoDB (Mongoose Schema)
-   **Authentication**: JSON Web Tokens (JWT) & Bcrypt password hashing
-   **Reporting**: `jspdf` & `jspdf-autotable` for PDF generation
-   **AI Engine**: OpenAI API (with robust local heuristic fallback)

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/aadarshsingh27/spendsmart.git
cd spendsmart
```

### 2. Install Dependencies
You can install all dependencies (root, backend, and frontend) with a single command:

```bash
npm run install-all
```

*Alternatively, you can install them manually:*
```bash
# Install Backend Dependencies
cd backend && npm install

# Install Frontend Dependencies
cd ../frontend && npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend/` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openai_api_key
# Note: If no OPENAI_API_KEY is provided, the app will automatically switch to the smart local heuristic mode.
```

### 4. Run the Application
You can run both servers concurrently from the root directory:

```bash
npm start
```

*The Backend will run on http://localhost:8000 and the Frontend on http://localhost:3000.*

---

## 📝 API Endpoints

### User & Auth
-   `POST /api/users`: Register a new user
-   `POST /api/users/login`: Login user
-   `DELETE /api/users/profile`: Permanently delete user account and data (Protected)

### Expenses
-   `GET /api/expenses`: Get all expenses for valid user
-   `POST /api/expenses`: Add a new expense
-   `DELETE /api/expenses/:id`: Delete a specific expense
-   `GET /api/expenses/summary/monthly`: Get monthly aggregate data

### AI Services
-   `POST /api/ai/categorize`: Parse natural language to structural data
-   `GET /api/ai/insights`: Get spending analysis (AI or Heuristic)

---

## 🤝 Contributing
Contributions are always welcome! Feel free to open issues or submit Pull Requests to improve SpendSmart.

## 👤 Author
**Aadarsh Singh** - [GitHub](https://github.com/aadarshsingh27)

## 📄 License
This project is licensed under the MIT License.
