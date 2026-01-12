# MERN Stack Conversion & AI Integration Plan

This plan documents the steps to convert the existing React expense tracker into a full-stack MERN application with AI-powered features.

## User Review Required
> [!IMPORTANT]
> - **Database**: I will assume you have a local MongoDB instance running or a MongoDB Atlas URI. I will configure the app to look for a `MONGO_URI` in a `.env` file.
> - **AI Service**: For "AI-powered features", I will implement a service layer that calls an LLM API (like OpenAI or Gemini). You will need to provide an API key in the `.env` file. For development without a key, I will include a mock implementation.
> - **Migration**: Existing data in `localStorage` will NOT be automatically migrated to the database. Users will start fresh.

## Proposed Changes

### Backend Setup (New `backend/` directory)
I will create a new `backend` directory with the following structure:
- `server.js`: Main entry point.
- `config/db.js`: MongoDB connection.
- `models/`: Mongoose schemas (User, Expense).
- `routes/`: API routes (Auth, Expenses, AI).
- `controllers/`: Logic for routes.
- `middleware/`: Auth middleware (JWT).
- `services/`: AI integration logic.

#### [NEW] Dependencies
- `express`, `mongoose`, `dotenv`, `cors`, `jsonwebtoken`, `bcryptjs`
- `openai` (for AI features)

### Frontend Refactor (`expense-tracker/` -> `frontend/`)
I will rename the existing `expense-tracker` directory to `frontend` to keep the root clean.

#### [MODIFY] `src/App.js`
- Remove `localStorage` logic.
- Introduce `AuthProvider` (Context API) to handle user state.
- Add `Login` and `Register` routes.

#### [NEW] `src/context/ThemeContext.js` (Renaming to GlobalContext or similar, or just adding new context)
- Create `CurrencyContext.js` to manage selected currency (USD, INR, EUR, GBP).
- Provide a `CurrencyProvider` to wrap the app.

#### [MODIFY] `src/Navbar.js`
- Add a dropdown to select currency.

#### [MODIFY] `src/ExpenseList.js`
- Subscribe to `CurrencyContext`.
- Replace `Intl.NumberFormat` hardcoded 'INR' with dynamic currency.
- **Replace CSV Export with PDF Export**: Use `jspdf` and `jspdf-autotable` to generate professional PDF reports.

#### [MODIFY] `src/AddExpenseForm.js` & `.css`
- **Design Overhaul**: Implement a modern "floating card" design with icons inside inputs.
- improved focus states and button animations.

## Verification Plan

### Automated Tests
- N/A

### Manual Verification
1.  **Currency**: Change dropdown from INR to USD. Verify all prices in Expense List update immediately.
2.  **PDF**: Click "Export PDF". Verify a PDF downloads with a clean table of expenses.
3.  **Design**: Check the Add Expense form for the new "Enhanced" look.

#### [DELETE] `src/components/AiInsights.js` (Optional)
- User asked to remove "Smart auto fill", not specifically Insights, but I will deprioritize further AI work. I will keep Insights as it was not explicitly asked to be removed, only the "feature" (Auto-fill) that wasn't working.

## Verification Plan

### Automated Tests
- Basic smoke tests for new Export button (interaction test).

### Manual Verification
1.  **Layout**: Check input sizes are larger. confirm Auto-fill section is GONE.
2.  **Export**: Click "Download CSV", verify file is downloaded and contains correct data.
3.  **Expense CRUD**: Ensure adding manual expenses still works perfectly.
