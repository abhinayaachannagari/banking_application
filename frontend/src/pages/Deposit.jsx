import { useEffect, useState } from "react";
import { getMyAccounts } from "../services/accountService";
import { depositMoney } from "../services/transactionService";
import Navbar from "../components/Navbar";

function Deposit() {

    const [accounts, setAccounts] = useState([]);
    const [accountNumber, setAccountNumber] = useState("");
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
                    setAccountNumber(data[0].accountNumber);
                }

            } catch (error) {
                setError("Unable to load accounts");
            }
        };

        loadAccounts();

    }, []);

    const handleDeposit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const data = await depositMoney(
                accountNumber,
                amount
            );

            setMessage(
                `Deposit successful. Transaction ID: ${data.transactionId}`
            );

            setAmount("");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Deposit failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <Navbar />

            <main>

                <h2>Deposit Money</h2>

                <form onSubmit={handleDeposit}>

                    <label>Select Account</label>

                    <select
                        value={accountNumber}
                        onChange={(e) =>
                            setAccountNumber(e.target.value)
                        }
                    >
                        {accounts.map((account) => (
                            <option
                                key={account.id}
                                value={account.accountNumber}
                            >
                                {account.accountType} -
                                {" "}
                                {account.accountNumber}
                            </option>
                        ))}
                    </select>

                    <br />
                    <br />

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

                    <br />
                    <br />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Deposit"}
                    </button>

                </form>

                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

            </main>

        </div>
    );
}

export default Deposit;