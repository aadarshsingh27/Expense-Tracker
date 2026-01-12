const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const categorizeExpense = async (text) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a smart financial assistant. Extract expense details from text. Return a JSON object with keys: 'description' (string), 'amount' (number), 'category' (string), and 'date' (YYYY-MM-DD format). Categories: Food, Transport, Stationary, Utilities, Entertainment, Health, Shopping, Other. If the currency is not specified, assume the user's local currency but return just the number."
                },
                {
                    role: "user",
                    content: `Extract details from: "${text}"`
                }
            ],
            temperature: 0.2, // Lower temperature for more deterministic output
        });

        try {
            const content = response.choices[0].message.content;
            return JSON.parse(content);
        } catch (parseError) {
            console.error("Failed to parse AI response", parseError);
            return null;
        }

    } catch (error) {
        console.error("OpenAI Error:", error);
        if (process.env.NODE_ENV === 'development' || !process.env.OPENAI_API_KEY) {
            console.log("Using Mock AI Data");
            // Regex to capture amount: look for digits, potentially with decimals, optional currency symbols prefix/suffix
            // Supports: $12.50, 12.50, 500rs, rs 500, ₹500
            const amountMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{1,2})?)/);
            const amount = amountMatch ? parseFloat(amountMatch[0].replace(/,/g, '')) : 0;

            // Simple keyword matching for better mock categorization
            const lowerText = text.toLowerCase();
            let category = "Other";
            if (lowerText.includes('food') || lowerText.includes('lunch') || lowerText.includes('dinner')) category = "Food";
            else if (lowerText.includes('uber') || lowerText.includes('taxi') || lowerText.includes('gas')) category = "Transport";
            else if (lowerText.includes('movie') || lowerText.includes('netflix')) category = "Entertainment";

            return {
                description: text,
                amount: amount,
                category: category,
                date: new Date().toISOString().split('T')[0]
            };
        }
        console.error("OpenAI API Error:", error);
        return null; // Return null so frontend can alert
    }
};


const generateInsights = async (expenses) => {
    try {
        const expenseSummary = expenses.map(e => `${e.date.toISOString().split('T')[0]}: ${e.description} - $${e.amount} (${e.category})`).join('\n');

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a personal financial advisor. Analyze the provided expense list. 
                    Return a JSON object containing an array called 'insights'. 
                    Each item in the array should have:
                    - 'type': 'warning' | 'tip' | 'praise'
                    - 'title': Short title (e.g., "High Food Spending")
                    - 'message': A helpful 1-sentence insight or suggestion.`
                },
                {
                    role: "user",
                    content: expenseSummary
                }
            ],
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;
        return JSON.parse(content);

    } catch (error) {
        console.error("OpenAI Error (Insights):", error);

        if (expenses.length === 0) {
            return {
                insights: [
                    { type: 'tip', title: 'Start Tracking', message: 'Add your first expense to get personalized insights!' }
                ]
            };
        }

        // Calculate total and category breakdown
        const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
        const categoryTotals = expenses.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] || 0) + e.amount;
            return acc;
        }, {});

        // Find top category
        let maxCategory = '';
        let maxAmount = 0;
        for (const [cat, amount] of Object.entries(categoryTotals)) {
            if (amount > maxAmount) {
                maxAmount = amount;
                maxCategory = cat;
            }
        }

        const insights = [];

        // 1. Spending Warning for Top Category
        if (maxCategory) {
            const percent = ((maxAmount / totalAmount) * 100).toFixed(0);
            insights.push({
                type: 'warning',
                title: `High ${maxCategory} Spending`,
                message: `You spent ${percent}% of your total expenses on ${maxCategory}.`
            });
        }

        // 2. Praise or Tip based on count
        if (expenses.length > 5) {
            insights.push({
                type: 'praise',
                title: 'Consistent Tracking',
                message: 'Great job tracking multiple expenses! Consistency is key.'
            });
        } else {
            insights.push({
                type: 'tip',
                title: 'Track More',
                message: 'Add more expenses to get a detailed breakdown of your habits.'
            });
        }

        // 3. General financial tip (randomized)
        const tips = [
            "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
            "Review your subscriptions monthly to remove unused ones.",
            "Cooking at home can save up to 40% compared to dining out.",
            "Set a monthly budget to avoid overspending."
        ];
        insights.push({
            type: 'tip',
            title: 'Financial Tip',
            message: tips[Math.floor(Math.random() * tips.length)]
        });

        return { insights };
    }
}


module.exports = { categorizeExpense, generateInsights };
