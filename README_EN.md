# Backoffice Bank

This is the backoffice application for managing various aspects of the banking system. This application is built using React and connects to a backend API, which handles the core logic and data storage.

## Project Structure

- **Frontend (Backoffice):** This repository contains the React-based front end for administrators and managers to interact with the banking system.
- **Backend:** The backend handles the database interactions, authentication, and business logic. It is crucial for the operation of the backoffice.

## Connection with the Backend

The backoffice communicates with the backend API to perform various actions, such as user management, account operations, transaction handling, and audit logging. The backend is essential for the backoffice to function correctly.

### Backend Repository

You can find the backend API repository [here](https://github.com/calfmike/backendBank).

### How They Work Together

- **Authentication:** User authentication is managed through the backend. The backoffice sends login credentials, and the backend returns a JWT token, which is then used for making authenticated requests.
- **User Management:** The backoffice allows administrators to create, update, delete, and view users. These operations are performed through API calls to the backend.
- **Account Management:** Admins can view and manage user accounts through the backoffice. The data is fetched from and updated in the backend.
- **Transactions:** The backoffice facilitates deposits, withdrawals, and transfers between accounts, all of which are processed by the backend.
- **Audit Logs:** The backoffice provides an interface for viewing audit logs, which are stored and managed by the backend.

## Features

### 1. User Management

- **Create User:** Administrators can create new users (both regular users and admins) through a form in the backoffice.
- **Edit User:** Existing user details can be modified, including resetting passwords.
- **Delete User:** Administrators can delete users from the system.
- **View User Profiles:** All users can be listed and viewed in detail.

### 2. Account Management

- **View Accounts:** List all accounts associated with a user.
- **Create Account:** Open new accounts (checking or savings) for users.
- **Delete Account:** Remove accounts that are no longer needed.

### 3. Transaction Management

- **Deposit Funds:** Add money to user accounts.
- **Withdraw Funds:** Remove money from user accounts.
- **Transfer Funds:** Move funds between user accounts.
- **Revert Transactions:** Revert a previous transaction if necessary.

### 4. Audit Logs

- **View Audit Logs:** Access and review logs of all actions taken within the system, helping in auditing and tracking activities.
