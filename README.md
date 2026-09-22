# SecureBank – Full-Stack Digital Banking & Payment Platform

SecureBank is a full-stack digital banking application designed to provide secure and reliable banking operations through a modern web interface.

The application allows users to register, securely log in, create bank accounts, manage balances, deposit and withdraw money, transfer funds between accounts, and view their transaction history.

The project follows a RESTful architecture with a React frontend, Spring Boot backend, PostgreSQL database, and JWT-based authentication.

---

## 🚀 Features

### 🔐 User Authentication

* User registration
* Secure password hashing using BCrypt
* User login
* JWT-based authentication
* Protected API endpoints
* Stateless session management
* Authentication through Spring Security

### 🏦 Bank Account Management

* Create a bank account
* Support for Savings and Current accounts
* Automatically generated account numbers
* View user's own bank accounts
* Account ownership validation
* Active/inactive account status
* Initial account balance

### 💰 Banking Operations

#### Deposit

Users can deposit money into their own bank account.

```text
User → Select Account → Enter Amount → Deposit
```

The account balance is updated and a transaction record is created.

#### Withdrawal

Users can withdraw money from their own account.

The system verifies:

* Account ownership
* Account status
* Available balance

The withdrawal is rejected if the account does not have sufficient funds.

#### Transfer

Users can transfer money from their own account to another SecureBank account.

The system verifies:

* Sender account ownership
* Sender account status
* Receiver account existence
* Receiver account status
* Sufficient balance
* Sender and receiver are different accounts

Both account balances are updated within a transactional operation.

### 📜 Transaction History

Users can view transactions associated with their bank accounts.

The system records:

* Transaction ID
* Transaction type
* Amount
* Sender account
* Receiver account
* Transaction status
* Transaction date and time

Supported transaction types:

```text
DEPOSIT
WITHDRAW
TRANSFER
```

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    │      Browser         │
                    └──────────┬───────────┘
                               │
                               │ HTTP / JSON
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │                      │
                    │  Login               │
                    │  Register            │
                    │  Dashboard           │
                    │  Accounts            │
                    │  Deposit             │
                    │  Withdraw            │
                    │  Transfer            │
                    │  Transactions        │
                    └──────────┬───────────┘
                               │
                         REST API + JWT
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │                      │
                    │ Controllers          │
                    │ Services             │
                    │ Repositories         │
                    │ Spring Security      │
                    │ JWT Authentication   │
                    └──────────┬───────────┘
                               │
                               │ JPA / Hibernate
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │                      │
                    │ Users                │
                    │ Accounts             │
                    │ Transactions         │
                    └──────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React.js
* JavaScript
* React Router
* Axios
* HTML5
* CSS3
* Vite

## Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT
* Maven

## Database

* PostgreSQL

## API Testing

* Postman

## Development Tools

* Visual Studio Code
* Git
* GitHub

---

# 📁 Project Structure

## Backend

```text
securebank/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── securebank/
│       │           └── securebank/
│       │
│       │               ├── config/
│       │               │   └── SecurityConfig.java
│       │               │
│       │               ├── controller/
│       │               │   ├── AuthController.java
│       │               │   ├── AccountController.java
│       │               │   └── TransactionController.java
│       │               │
│       │               ├── dto/
│       │               │   ├── LoginRequest.java
│       │               │   ├── RegisterRequest.java
│       │               │   ├── DepositRequest.java
│       │               │   ├── WithdrawRequest.java
│       │               │   └── TransferRequest.java
│       │               │
│       │               ├── entity/
│       │               │   ├── User.java
│       │               │   ├── Account.java
│       │               │   └── Transaction.java
│       │               │
│       │               ├── repository/
│       │               │   ├── UserRepository.java
│       │               │   ├── AccountRepository.java
│       │               │   └── TransactionRepository.java
│       │               │
│       │               ├── security/
│       │               │   ├── JwtService.java
│       │               │   └── JwtAuthenticationFilter.java
│       │               │
│       │               └── service/
│       │                   ├── AuthService.java
│       │                   ├── AccountService.java
│       │                   └── TransactionService.java
│       │
│       └── resources/
│           └── application.properties
│
└── pom.xml
```

## Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── AccountCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CreateAccount.jsx
│   │   ├── Deposit.jsx
│   │   ├── Withdraw.jsx
│   │   ├── Transfer.jsx
│   │   └── Transactions.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── accountService.js
│   │   └── transactionService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── package.json
```

---

# 🔑 Authentication Flow

SecureBank uses JWT for authentication.

```text
1. User enters email and password
             ↓
2. React sends login request
             ↓
3. Spring Boot validates credentials
             ↓
4. BCrypt verifies password
             ↓
5. Server generates JWT
             ↓
6. React stores JWT
             ↓
7. JWT is attached to protected API requests
             ↓
8. JwtAuthenticationFilter validates JWT
             ↓
9. Authentication is stored in SecurityContext
             ↓
10. Protected endpoint is accessed
```

Example request:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 🔒 Security

The application implements several security mechanisms.

### Password Hashing

Passwords are not stored as plain text.

Spring Security's `BCryptPasswordEncoder` is used for password hashing.

### JWT Authentication

Authenticated users receive a JWT after successful login.

Protected APIs require a valid JWT.

### Stateless Authentication

The application uses:

```java
SessionCreationPolicy.STATELESS
```

This means the server does not maintain traditional HTTP sessions for authentication.

### Account Ownership

Users cannot perform banking operations on another user's account.

For example:

```text
User A
   ↓
Own Account
   ↓
Deposit / Withdraw / Transfer
```

If User A tries to use User B's account number, the backend rejects the request.

### Transactional Operations

Money transfers use Spring's:

```java
@Transactional
```

This ensures that the transfer operation is treated as a single database transaction.

Conceptually:

```text
Debit Sender
     ↓
Credit Receiver
     ↓
Create Transaction Record
```

If an error occurs during the transaction, the database operation can be rolled back.

---

# 🔌 REST API Endpoints

## Authentication

### Register

```http
POST /api/users
```

Example:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Example:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Accounts

### Create Account

```http
POST /api/accounts
```

Example:

```json
{
  "accountType": "SAVINGS"
}
```

### Get My Accounts

```http
GET /api/accounts
```

Requires JWT authentication.

---

## Transactions

### Deposit

```http
POST /api/transactions/deposit/{accountNumber}
```

Request:

```json
{
  "amount": 5000
}
```

### Withdraw

```http
POST /api/transactions/withdraw/{accountNumber}
```

Request:

```json
{
  "amount": 1000
}
```

### Transfer

```http
POST /api/transactions/transfer/{senderAccountNumber}
```

Request:

```json
{
  "receiverAccountNumber": "123456789012",
  "amount": 500
}
```

### Transaction History

```http
GET /api/transactions
```

Requires JWT authentication.

---

# 🗄️ Database Model

The major entities are:

```text
User
 │
 │ 1
 │
 │ *
 ▼
Account
 │
 │
 │
 ├───────────────┐
 │               │
 │               │
 ▼               ▼
Transaction   Transaction
```

A user can have multiple bank accounts.

A transaction can reference:

```text
Sender Account
       +
Receiver Account
```

For example:

### Deposit

```text
Sender: NULL
Receiver: User's Account
```

### Withdrawal

```text
Sender: User's Account
Receiver: NULL
```

### Transfer

```text
Sender: Sender Account
Receiver: Receiver Account
```

---

# 🔄 Transfer Workflow

```text
User
 │
 │ Transfer ₹500
 ▼
React Frontend
 │
 │ POST /api/transactions/transfer/{sender}
 ▼
TransactionController
 │
 ▼
TransactionService
 │
 ├── Find sender account
 │
 ├── Verify account ownership
 │
 ├── Check sender account status
 │
 ├── Find receiver account
 │
 ├── Check receiver account status
 │
 ├── Check sufficient balance
 │
 ├── Debit sender
 │
 ├── Credit receiver
 │
 └── Save transaction
 │
 ▼
PostgreSQL
```

---

# 💡 Example Transaction

Suppose:

```text
Sender Account Balance = ₹10,000
Transfer Amount        = ₹2,000
```

After transfer:

```text
Sender Balance   = ₹8,000
Receiver Balance = Previous Balance + ₹2,000
```

A transaction record is created:

```text
Transaction ID : TXN-XXXXXXXXXXXX
Type           : TRANSFER
Amount         : ₹2,000
Status         : SUCCESS
Created At     : Current Date/Time
```

---

# ▶️ How to Run the Project

## 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

```bash
cd Secure_Banking_Application
```

---

## 2. Configure PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE securebank;
```

Update your Spring Boot database configuration in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/securebank
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Do not commit real database passwords to GitHub.

---

## 3. Start Backend

From the backend directory:

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

## 4. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# 🧪 Testing

The REST APIs can be tested using Postman.

Recommended testing sequence:

```text
1. Register User
       ↓
2. Login
       ↓
3. Copy JWT
       ↓
4. Create Bank Account
       ↓
5. Deposit Money
       ↓
6. Check Balance
       ↓
7. Withdraw Money
       ↓
8. Create Second User/Account
       ↓
9. Transfer Money
       ↓
10. Get Transaction History
```

For protected requests:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 📌 Current Project Status

### Implemented

* [x] User registration
* [x] BCrypt password hashing
* [x] User login
* [x] JWT generation
* [x] JWT authentication filter
* [x] Protected routes
* [x] Bank account creation
* [x] Savings account
* [x] Current account
* [x] Account ownership validation
* [x] Deposit
* [x] Withdrawal
* [x] Money transfer
* [x] Transaction records
* [x] Transaction history API
* [x] React frontend
* [x] React routing
* [x] Protected frontend pages
* [x] Axios API integration
* [x] Postman API testing

### Planned Enhancements

* [ ] Beneficiary management
* [ ] Transaction limits
* [ ] Idempotency for payment requests
* [ ] Concurrency handling
* [ ] Audit logs
* [ ] Admin dashboard
* [ ] Role-based authorization
* [ ] Redis integration
* [ ] Swagger/OpenAPI documentation
* [ ] JUnit and Mockito testing
* [ ] Docker deployment
* [ ] Production-ready secret management
* [ ] Improved transaction DTOs
* [ ] Pagination and filtering for transaction history

---

# 🎯 Learning Objectives

This project was developed to gain practical experience with:

* Java backend development
* Spring Boot
* REST API development
* Spring Security
* JWT authentication
* BCrypt password hashing
* Spring Data JPA
* Hibernate
* PostgreSQL
* React.js
* Axios
* React Router
* Database relationships
* Transaction management
* API testing using Postman
* Full-stack application architecture

---

# 📚 Key Concepts Demonstrated

### Backend

```text
REST API
Spring Boot
Dependency Injection
Spring Security
JWT
JPA
Hibernate
Repository Pattern
Service Layer
DTOs
Exception Handling
Database Transactions
```

### Frontend

```text
React Components
React Hooks
Context API
React Router
Protected Routes
Axios
API Services
Form Handling
State Management
```

### Database

```text
Relational Database
Primary Keys
Foreign Keys
Entity Relationships
One-to-Many Relationships
Transaction Records
```

---

# 👨‍💻 Author

**Vishnu Undeela**

B.Tech – Artificial Intelligence & Data Science

---

# ⭐ Project Summary

SecureBank demonstrates how a real-world banking application can be structured using a modern full-stack architecture.

The project separates responsibilities into:

```text
React
  ↓
REST API
  ↓
Spring Boot
  ↓
Spring Security + JWT
  ↓
Service Layer
  ↓
JPA / Hibernate
  ↓
PostgreSQL
```

The primary focus of the project is **secure authentication, account ownership, reliable money movement, transaction management, and clean separation between frontend and backend responsibilities**.
