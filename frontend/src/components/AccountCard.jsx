function AccountCard({ account }) {

    return (
        <div className="account-card">

            <h3>{account.accountType} Account</h3>

            <p>Account Number</p>
            <strong>{account.accountNumber}</strong>

            <h2>
                ₹{Number(account.balance).toLocaleString("en-IN")}
            </h2>

            <p>Status: {account.status}</p>

        </div>
    );
}

export default AccountCard;