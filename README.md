# QuickAssist

<img src="https://www.python.org/static/community_logos/python-logo-master-v3-TM.png" alt="Python" width="100"/> 
<img src="https://flask.palletsprojects.com/en/2.0.x/_images/flask-logo.png" alt="Flask" width="100"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="100"/> 
<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="100"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg" alt="NPM" width="100"/> 

QuickAssist is a web application designed to connect users with service providers offering a variety of services such as house cleaning, market shopping, babysitting, cooking, and laundry. This project serves as a portfolio piece for Muritadhor Arowolo, a Software Engineering student at ALX Africa, and was submitted as part of the graduation requirements for the specialization phase of the ALX Software Engineering program.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Starting the Backend](#starting-the-backend)
  - [Starting the Frontend](#starting-the-frontend)
- [API Documentation](#api-documentation)
- [License](#license)
- [About the Developer](#about-the-developer)

## About the Project

QuickAssist provides a platform where users can register as either service providers or consumers. Service providers can offer various services, and consumers can easily find and book these services. The application is structured with a backend built using Flask and a frontend developed with React.js.

## Features
- **User Registration:** Users can sign up as either a service provider or a regular user.
- **Service Listing:** A landing page displays all available service providers, which can be filtered by service type.
- **Dashboard:** Service providers have access to a dashboard to manage their services.
- **Chat Feature:** Users can communicate directly with service providers via an in-app chat.
- **Profile Pages:** Each user has a profile page where their details and services are displayed.
- **API Documentation:** Detailed API documentation is available for developers.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- <img src="https://www.python.org/static/community_logos/python-logo-master-v3-TM.png" alt="Python" width="50"/> Python 3.8+
- <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="50"/> Node.js and npm
- <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" alt="Git" width="50"/> Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Armolas/QuickAssist.git
   cd QuickAssist
   ```
2. Install Python dependencies:
  ```bash
  cd backend
  pip install -r requirements.txt
  ```
3. Install Node.js dependencies for the frontend:
  ```bash
  cd ../frontend/app
  npm install
  ```

## Usage

### Starting the Backend
1. Navigate to the backend API directory:
   ```bash
   cd QuickAssist/backend/api
   ```
2. Start the backend server:
   ```bash
   PYTHONPATH=. python app/main.py
   ```
3. The backend server will start, and you can access the API documentation at:
   ```
   http://localhost:5000/swagger
   ```

### Starting the Frontend
1. Navigate to the frontend app directory:
   ```bash
   cd QuickAssist/frontend/app
   ```
2. Start the frontend server:
   ```bash
   npm run start
   ```
3. The frontend application will start, and you can access it at:
   ```arduino
   http://localhost:3000
   ```

## API Documentation

The API documentation is available at `/swagger` on the backend server. This provides detailed information about the available endpoints, request parameters, and response formats.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## About the Developer

Muritadhor Arowolo is a passionate software engineering student at ALX Africa. He is focused on developing scalable and efficient software solutions. This project, QuickAssist, was submitted as part of his portfolio for the specialization phase of the ALX Software Engineering program.

- **Twitter:** [@armolas_06](https://x.com/armolas_06)
- **LinkedIn:** [Muritadhor Arowolo](https://www.linkedin.com/in/muritadhorarowolo)
