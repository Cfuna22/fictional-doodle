const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Get all snacks
export const getSnacks = async () => {
    const res = await fetch(`${BASE_URL}/api/snacks`);
    if (!res.ok) {
        throw new Error('Failed to fetch snacks');
    }
    return await res.json();
}

// Place an order
interface OrderData {
    // Define the expected properties of the order data
    // For example:
    // snackId: string;
    // quantity: number;
    // customerName: string;
    // Add more fields as needed
    [key: string]: unknown;
}

export const placeOrder = async (orderData: OrderData) => {
    const res = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    return res.ok ? await res.json() : Promise.reject('Failed to place order');
}