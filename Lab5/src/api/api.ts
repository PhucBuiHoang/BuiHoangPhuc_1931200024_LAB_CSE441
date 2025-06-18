//API
const BASE_URL = 'https://kami-backend-5rs0.onrender.com';

// api/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logOut = async () => {
    await AsyncStorage.removeItem('token');
};

export const login = async (phone: string, password: string): Promise<string> => {
    const res = await fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Login failed');
    return json.token;
};

export const fetchServices = async (token: string): Promise<any[]> => {
    const res = await fetch(`${BASE_URL}/services`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch services');
    return json;
};

export const fetchServiceById = async (id: string, token: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch service');
    return json;
};

export const deleteService = async (id: string, token: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to delete service');
    }
};

export const updateService = async (
    id: string,
    name: string,
    price: number,
    token: string
): Promise<void> => {
    const res = await fetch(`${BASE_URL}/services/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price }),
    });

    if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to update service');
    }
};

export const addService = async (
    name: string,
    price: number,
    token: string
): Promise<any> => {
    const res = await fetch(`${BASE_URL}/services`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price }),
    });

    if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to add service');
    }

    return await res.json();
};

export const fetchCustomers = async (): Promise<any[]> => {
    const res = await fetch(`${BASE_URL}/customers`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch customers');
    return json;
};

export const addCustomer = async (
    name: string,
    phone: string,
    token: string
): Promise<any> => {
    const res = await fetch(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to add customer');
    return json;
};

export const fetchCustomerDetail = async (_id: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/customers/${_id}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch customer detail');
    return json;
};

export const editCustomer = async (
    _id: string,
    name: string,
    phone: string,
    token: string
): Promise<any> => {
    const res = await fetch(`${BASE_URL}/customers/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update customer');
    return json;
};

export const deleteCustomer = async (_id: string, token: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/customers/${_id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to delete customer');
    }
};

export const fetchTransactions = async (): Promise<any[]> => {
    const res = await fetch(`${BASE_URL}/transactions`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch transactions');
    return json;
};

export const fetchTransactionById = async (id: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/transactions/${id}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch transaction');
    return json;
};

export const addTransaction = async (
    customerId: string,
    services: { _id: string, quantity: number, userId: string }[],
    token: string
): Promise<any> => {
    const res = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customerId, services }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to add transaction');
    return json;
};

export const deleteTransaction = async (id: string, token: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to delete transaction');
    }
};
