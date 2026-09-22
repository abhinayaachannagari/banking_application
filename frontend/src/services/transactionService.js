
import api from "./api";

export const depositMoney = async (accountNumber, amount) => {
    const response = await api.post(
       `/api/transactions/deposit/${accountNumber}`,
        {
            amount: Number(amount),
        }
    );

    return response.data;
};

export const withdrawMoney = async (accountNumber, amount) => {
    const response = await api.post(
       `/api/transactions/withdraw/${accountNumber}`,
        {
            amount: Number(amount),
        }
    );

    return response.data;
};

export const transferMoney = async (
    senderAccountNumber,
    receiverAccountNumber,
    amount
) => {
    const response = await api.post(
       `/api/transactions/transfer/${senderAccountNumber}`,
        {
            receiverAccountNumber,
            amount: Number(amount),
        }
    );

    return response.data;
};

export const getTransactionHistory = async () => {
    const response = await api.get("/api/transactions");

    return response.data;
};

