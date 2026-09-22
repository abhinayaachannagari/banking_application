
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getTransactionHistory
} from "../services/transactionService";

import Navbar from "../components/Navbar";

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadTransactions = async () => {

            try {

                const data = await getTransactionHistory();

                setTransactions(data);

            } catch (error) {

                console.error(error);

                setError("Unable to load transactions");

            } finally {

                setLoading(false);

            }
        };

        loadTransactions();

    }, []);

    return (
        <div>

            <Navbar />

            <main>

                <h2>Transaction History</h2>

                {loading && (
                    <p>Loading transactions...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {!loading &&
                    !error &&
                    transactions.length === 0 && (
                        <p>No transactions found.</p>
                    )}

                {!loading &&
                    !error &&
                    transactions.length > 0 && (

                    <table border="1" cellPadding="10">

                        <thead>

                            <tr>
                                <th>Transaction ID</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>

                        </thead>

                        <tbody>

                            {transactions.map((transaction) => (

                                <tr key={transaction.id}>

                                    <td>
                                        {transaction.transactionId}
                                    </td>

                                    <td>
                                        {transaction.transactionType}
                                    </td>

                                    <td>
                                        ₹{Number(
                                            transaction.amount
                                        ).toLocaleString("en-IN")}
                                    </td>

                                    <td>
                                        {transaction.status}
                                    </td>

                                    <td>
                                        {new Date(
                                            transaction.createdAt
                                        ).toLocaleString("en-IN")}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </main>

        </div>
    );
}

export default Transactions;

