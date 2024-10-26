# AI Integration Project

This project integrates GPT and Gemini AI models to generate prompts. It also logs AI responses to a MongoDB database and uses Docker for containerization.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Logging](#logging)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate prompts using OpenAI GPT.
- Generate prompts using Gemini AI.
- Log AI responses in a MongoDB database.
- Dockerized for easy setup and deployment.
  
## Technologies

- **Node.js**: Backend framework.
- **Express**: Web framework for Node.js.
- **MongoDB**: Database for storing request logs and AI responses.
- **Docker**: Containerization.
- **GPT & Gemini**: AI models for prompt generation.
- **DBeaver**: Visual tool for managing MongoDB.

## Project Structure

```bash
.
├── config
│   └── db.js              # MongoDB connection configuration
├── middleware
│   ├── authenticate.js     # Authentication middleware
│   └── logger.js           # Request and AI response logging
├── routes
│   └── routes.js           # API route definitions
├── service
│   ├── gptService.js       # GPT AI integration
│   └── geminiService.js    # Gemini AI integration
├── .env                    # Environment variables
├── controllers.js          # Request handlers for APIs
├── Dockerfile              # Docker configuration for the app
├── docker-compose.yml      # Docker Compose for MongoDB and app
├── server.js               # App entry point
└── README.md               # Project documentation


============

Clone the repository:
---------------------

    git clone https://github.com/jonatasriciano/ai-integration.git
    cd ai-integration
    

Install the dependencies:
-------------------------

    npm install
    

Make sure you have Docker and Docker Compose installed on your machine.

Running the Project
===================

Start MongoDB and the Node.js app using Docker Compose:
-------------------------------------------------------

    docker-compose up
    

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

Environment Variables
=====================

You need to configure environment variables in a `.env` file in the root of the project:

    API_KEY=your-api-key
    GPT_API_KEY=your-gpt-api-key
    GEMINI_API_KEY=your-gemini-api-key
    
*   **API\_KEY**: The user key.
*   **GPT\_API\_KEY**: The API key for GPT AI integration.
*   **GEMINI\_API\_KEY**: The API key for Gemini AI integration.

API Endpoints
=============

*   **POST /api/gpt** - Generate a prompt using GPT AI.
*   **POST /api/gemini** - Generate a prompt using Gemini AI.

Example request body:
---------------------

    {
      "prompt": "Tell me a story about a wise owl.",
      "tokens": 150
    }
    

Example Response:
-----------------

    {
      "response": "Once upon a time, in a faraway forest, there lived a wise owl..."
    }
    

Logging
=======

All requests and AI responses are logged to the MongoDB collection `request_logs`. You can view the logs using a MongoDB management tool like DBeaver.

Docker
======

This project is Dockerized for easy setup. You can run both the MongoDB instance and the Node.js app using Docker Compose.

To build the Docker images:
---------------------------

    docker-compose build
    

To start the services:
----------------------

    docker-compose up
    

To stop the services:
---------------------

    docker-compose down
    

Contributing
============

Contributions are welcome! Please open an issue or submit a pull request.

License
=======

This project is licensed under the MIT License.