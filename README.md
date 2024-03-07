# TECHNOHOLIC

Welcome to the College Tech Event Registration Panel! This web application allows users to register for the college tech event, receive a unique competition code via email, and edit their responses using the provided code. Additionally, there's an admin login to manage and view participant details.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

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
  - Firestore: Firebase Firestore is used to store and retrieve registration data.
  - Email Sending: Firebase Email Authentication is used to send registration codes via email.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ynwsaurabh/.git
   cd college-tech-event-registration
