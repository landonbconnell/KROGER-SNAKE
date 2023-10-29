import React, { useState, useEffect } from 'react';
import { searchProductsByTerm } from '../api/kroger/products.ts';

const SearchComponent = () => {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState(initialCart);
    const [path, setPath] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
        const results = await searchProductsByTerm(query);
        setItems(results);
    } catch (error) {
        console.error("Error during search:", error); // Log the detailed error
        setError("An error occurred while searching. " + error.message); // Display the error message
    } finally {
        setLoading(false);
    }
};


    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const clearCart = () => {
        if (window.confirm("Are you sure you want to clear the cart?")) {
            setCart([]);
        }
    };

    const generatePath = () => {
        const aisles = cart.map(item => item.aisle);
        const sortedAisles = [...new Set(aisles)].sort((a, b) => a - b);
        setPath(sortedAisles);
    };

    return (
        <div className="container">
            <div className="cart-section">
                <h2>Cart</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <img src={item.image} alt={item.name} width="50" height="50" />
                            {item.name} (Aisle: {item.aisle})
                        </li>
                    ))}
                </ul>
                <button onClick={clearCart}>Clear Cart</button>
            </div>

            <div className="main-section">
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search items..."
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>

                <div className="scrollable-list">
                    {items.map((item, index) => (
                        <div key={index} className="item-box">
                            <img src={item.image} alt={item.name} width="100" height="100" />
                            {item.name} (Aisle: {item.aisle})
                            <button onClick={() => addToCart(item)}>Add to cart</button>
                        </div>
                    ))}
                </div>

                <button onClick={generatePath}>Generate Path</button>
                <h2>Optimized Path</h2>
                <ul>
                    {path.map((aisle, index) => (
                        <li key={index}>
                            Aisle: {aisle}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchComponent;
