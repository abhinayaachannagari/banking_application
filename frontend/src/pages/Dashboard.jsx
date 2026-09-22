import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyAccounts } from "../services/accountService";
import { useAuth } from "../context/AuthContext";
import AccountCard from "../components/AccountCard";
import Navbar from "../components/Navbar";
function Dashboard() {

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const loadAccounts = async () => {

            try {

                const data = await getMyAccounts();
                setAccounts(data);

            } catch (error) {

                console.error(error);
                setError("Unable to load accounts");

            } finally {

                setLoading(false);
            }
        };

        loadAccounts();

    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
           
            <header>
                <h1>SecureBank</h1>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </header>
           <Navbar/>
            <main>

                <h2>Dashboard</h2>

                <p>Welcome to your SecureBank account.</p>

                {loading && <p>Loading accounts...</p>}

                {error && <p>{error}</p>}

               {!loading && !error && accounts.length === 0 && (
    <div className="account-card">
        <h3>Welcome to SecureBank</h3>

        <p>
            You haven't created a bank account yet.
        </p>

        <button
            className="primary-button"
            onClick={() => navigate("/create-account")}
        >
            Create Your First Account
        </button>
    </div>
)}

                <div>

                    {accounts.map((account) => (
                        <AccountCard
                            key={account.id}
                            account={account}
                        />
                    ))}
                        <h3>Quick Actions</h3>

    <button onClick={() => navigate("/deposit")}>
        Deposit
    </button>

    <button onClick={() => navigate("/withdraw")}>
        Withdraw
    </button>

    <button onClick={() => navigate("/transfer")}>
        Transfer
    </button>

    <button onClick={() => navigate("/transactions")}>
        Transactions
    </button>
    <button onClick={()=>navigate("/createaccount")}>CreateAccount</button>


                </div>

            </main>

        </div>
    );
}

export default Dashboard;