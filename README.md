# Avensys-LoginAPP

Simple Login Application with Firebase Integration

This repository contains a simple login application built using React JS for the frontend and Java with Spring Boot for the backend. The application is integrated with Firebase as the database and authentication provider.

## Technologies Used

- Frontend: React JS
- Backend: Java with Spring Boot
- Database & Authentication: Firebase

## Set up & Installation

Follow these steps to get the application up and running on your local machine:

### 1. Clone the Repository
First, clone this repository to your local machine using the following command:
```
git clone https://github.com/Rishanan-A/Avensys-LoginAPP.git
```

### 2. Install Frontend Dependencies
Navigate to the frontend directory inside the cloned repository and install all the required Node modules by running the following command:
```
npm install
```

### 3. Run Backend
Navigate back to the root directory of the cloned repository and then enter the backend directory. Compile and run the Java Spring Boot backend.

### 4. Run Frontend
After the dependencies are installed and Firebase is configured, start the React JS frontend by running the following command:
```
npm start
```

This will launch the application in your default web browser. You can access it at http://localhost:3000.

## Usage

The application provides a simple login page where users can enter their credentials. It validates the user input and performs a login process with Firebase as the authentication provider and stores user data in the Firebase Realtime Database. Once logged in, users with a "manager" role will be provided an extra button and will be able to access all the users on the database on a restricted page.

## Change Log

V1.0 (4/8/2023)
- Initial upload of frontend and backend

v1.0.1 (6/8/2023)
- Changed Create user Modal view

v1.1 (7/8/2023)
- Implemented new route guard
- Fix small bugs
- Added Spanish translations

v1.2 (8/8/2023)
- Added NavBar for better navigation
- UI update

v1.3 (8/8/2023)
- Added ability to Update/Delete user
- UI update

v1.3.1 (10/8/2023)
- Added more translations
- UI update
