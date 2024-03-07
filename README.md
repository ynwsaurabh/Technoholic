# TECHNOHOLIC

Welcome to the College Tech Event Registration Panel! This web application allows users to register for the college tech event, receive a unique competition code via email, and edit their responses using the provided code. Additionally, there's an admin login to manage and view participant details.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

## Features

- **User Registration:**
  - Participants can register for the event by filling out a form.
  - Unique competition codes are sent to users via email.

- **Code Authentication:**
  - Users can log in using their competition code to access and edit their registration information.

- **Admin Panel:**
  - Admins can log in to view a list of all registered participants.
  - Admins can see the total number of registered students.

## Technologies Used

- **Next.js:**
  - A React-based framework for building server-rendered React applications.

- **Firebase:**
  - Authentication: Firebase Authentication is used for user authentication.
  - Firesbase Realtime Database: Firebase Realtime Database is used to store and retrieve registration data.
  - Firebase Storage: Firebase Storage is used to store Images and ID

- **Nodemailer:**
  - Email Sending: Nodemailer package is utilized to handle email sending functionalities. Ensure your Nodemailer configuration is correctly set up for email notifications.

## Firebase Configuration

Ensure that your Firebase package is installed and configured correctly run:
```bash
npm install firebase
```
## Nodemailer for Email Sending

Ensure that your Nodemailer package is installed and configured correctly for email notifications. If not installed, run:
```bash
npm install nodemailer
```

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ynwsaurabh/Technoholic.git
   cd college-tech-event-registration
   ```

2. **Install Dependencies:**
    ```bash
   npm install
   ```

3. **Run the Application:**
    ``` bash
    npm run dev

4. **Open in Browser:**
Visit http://localhost:3000 in your browser.