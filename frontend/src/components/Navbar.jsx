import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav>

            <h2 onClick={() => navigate("/dashboard")}>
                SecureBank
            </h2>

            <div>

                <button onClick={() => navigate("/dashboard")}>
                    Dashboard
                </button>
                <button onClick={()=> navigate("/deposit")}>
                    Deposit
                </button>
                <button onClick={()=> navigate("/withdraw")}>
                    Withdraw
                </button>
                <button onClick={() => navigate("/transactions")}>
                    Transactions
                </button>

                <button onClick={() => navigate("/transfer")}>
                    Transfer
                </button>
                <buuton onClick={()=> navigate("/create-account")}>CreateAcccount</buuton>
                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;