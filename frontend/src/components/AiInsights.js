import React, { useEffect, useState } from 'react';
import { getInsights } from '../api';
import './AiInsights.css';

const AiInsights = ({ expenses = [] }) => {
    const [insightsData, setInsightsData] = useState({ insights: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Only fetch if there are expenses
        if (expenses.length === 0) {
            setInsightsData({ insights: [] });
            return;
        }

        const fetchInsights = async () => {
            setLoading(true);
            try {
                const { data } = await getInsights();
                setInsightsData(data);
            } catch (error) {
                console.error("Error fetching insights", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, [expenses]); // Re-run when expenses change

    const getIcon = (type) => {
        switch (type) {
            case 'warning': return '⚠️';
            case 'tip': return '💡';
            case 'praise': return '🎉';
            default: return 'ℹ️';
        }
    };

    const getTypeClass = (type) => {
        switch (type) {
            case 'warning': return 'insight-warning';
            case 'tip': return 'insight-tip';
            case 'praise': return 'insight-praise';
            default: return 'insight-default';
        }
    };

    return (
        <div className="ai-insights-container">
            <h3><span role="img" aria-label="brain">🧠</span> AI Financial Advisor</h3>
            {loading ? (
                <div className="ai-loading">Analyzing your spending habits...</div>
            ) : (
                <div className="insights-grid">
                    {insightsData.insights && Array.isArray(insightsData.insights) && insightsData.insights.length > 0 ? (
                        insightsData.insights.map((insight, index) => (
                            <div key={index} className={`insight-card ${getTypeClass(insight.type)}`}>
                                <div className="insight-icon">{getIcon(insight.type)}</div>
                                <div className="insight-content">
                                    <h4>{insight.title}</h4>
                                    <p>{insight.message}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="insight-empty-state">
                            <span role="img" aria-label="chart">📊</span>
                            <p>Add some expenses to generate AI financial advice!</p>
                        </div>
                    )
                    }
                </div >
            )}
        </div >
    );
};

export default AiInsights;
