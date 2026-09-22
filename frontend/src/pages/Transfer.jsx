
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAccounts } from "../services/accountService";
import { transferMoney } from "../services/transactionService";
import Navbar from "../components/Navbar";

function Transfer() {
    const [accounts, setAccounts] = useState([]);
    const [senderAccount, setSenderAccount] = useState("");
    const [receiverAccount, setReceiverAccount] = useState("");
    const [amount, setAmount] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const data = await getMyAccounts();

                setAccounts(data);

                if (data.length > 0) {
                    setSenderAccount(data[0].accountNumber);
                }
            } catch (error) {
                setError("Unable to load your accounts");
            }
        };

        loadAccounts();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!receiverAccount) {
            setError("Enter receiver account number");
            return;
        }

        if (senderAccount === receiverAccount) {
            setError("Sender and receiver accounts cannot be the same");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            setError("Enter a valid amount");
            return;
        }

        setLoading(true);

        try {
            const data = await transferMoney(
                senderAccount,
                receiverAccount,
                amount
            );

            setMessage(
                `Transfer successful. Transaction ID: ${data.transactionId}`
            );

            setReceiverAccount("");
            setAmount("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Transfer failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <main>
                <h2>Transfer Money</h2>

                <form onSubmit={handleTransfer}>

                    <div>
                        <label>From Account</label>

                        <select
                            value={senderAccount}
                            onChange={(e) =>
                                setSenderAccount(e.target.value)
                            }
                        >
                            {accounts.map((account) => (
                                <option
                                    key={account.id}
                                    value={account.accountNumber}
                                >
                                    {account.accountType} -{" "}
                                    {account.accountNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    <br />

                    <div>
                        <label>Receiver Account Number</label>

                        <input
                            type="text"
                            placeholder="Enter receiver account number"
                            value={receiverAccount}
                            onChange={(e) =>
                                setReceiverAccount(e.target.value)
                            }
                            required
                        />
                    </div>

                    <br />

                    <div>
                        <label>Amount</label>

                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            required
                        />
                    </div>

                    <br />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Transfer Money"}
                    </button>
                </form>

                {message && (
                    <p>{message}</p>
                )}

                {error && (
                    <p>{error}</p>
                )}
            </main>
        </div>
    );
}

export default Transfer;

