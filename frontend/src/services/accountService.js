import api from "./api";

export const getMyAccounts = async () => {
    const response = await api.get("/api/accounts");
    return response.data;
};

export const createAccount = async (accountType) => {
    const response = await api.post("/api/accounts", {
        accountType,
    });

    return response.data;
};