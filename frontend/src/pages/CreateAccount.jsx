
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAccount } from "../services/accountService";
import Navbar from "../components/Navbar";

function CreateAccount() {
    const navigate = useNavigate();

    const [accountType, setAccountType] = useState("SAVINGS");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [createdAccount, setCreatedAccount] = useState(null);

    const handleCreateAccount = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");
        setCreatedAccount(null);

        try {
            const data = await createAccount(accountType);

            setCreatedAccount(data);
            setMessage("Bank account created successfully!");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to create bank account"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <main>
                <h2>Create Bank Account</h2>

                <p>
                    Choose the type of bank account you want to create.
                </p>

                <form onSubmit={handleCreateAccount}>

                    <div className="form-group">

                        <label>
                            Account Type
                        </label>

                        <select
                            value={accountType}
                            onChange={(e) =>
                                setAccountType(e.target.value)
                            }
                        >
                            <option value="SAVINGS">
                                Savings Account
                            </option>

                            <option value="CURRENT">
                                Current Account
                            </option>
                        </select>

                    </div>

                    <button
                        className="primary-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Bank Account"}
                    </button>

                </form>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {createdAccount && (
                    <div className="account-card">

                        <h3>
                            Account Created
                        </h3>

                        <p>
                            Account Number
                        </p>

                        <strong>
                            {createdAccount.accountNumber}
                        </strong>

                        <p>
                            Account Type
                        </p>

                        <strong>
                            {createdAccount.accountType}
                        </strong>

                        <p>
                            Opening Balance
                        </p>

                        <strong>
                            ₹{Number(
                                createdAccount.balance
                            ).toLocaleString("en-IN")}
                        </strong>

                        <p>
                            Status: {createdAccount.status}
                        </p>

                        <br />

                        <button
                            className="primary-button"
                            onClick={() => navigate("/dashboard")}
                        >
                            Go to Dashboard
                        </button>

                    </div>
                )}

            </main>
        </div>
    );
}

export default CreateAccount;

