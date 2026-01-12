import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹', locale: 'en-IN' });

    const changeCurrency = (currencyCode) => {
        switch (currencyCode) {
            case 'USD':
                setCurrency({ code: 'USD', symbol: '$', locale: 'en-US' });
                break;
            case 'EUR':
                setCurrency({ code: 'EUR', symbol: '€', locale: 'en-DE' });
                break;
            case 'GBP':
                setCurrency({ code: 'GBP', symbol: '£', locale: 'en-GB' });
                break;
            case 'INR':
            default:
                setCurrency({ code: 'INR', symbol: '₹', locale: 'en-IN' });
                break;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
