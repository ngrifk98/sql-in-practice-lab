# SQL in Practice Lab

This repository contains the source code and instructions for the SQL in Practice lab. This lab is designed to help you practice your SQL skills and build a simple web application for managing appointments.

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The SQL in Practice lab is a hands-on project that aims to reinforce your understanding of SQL and its application in a web development context. It involves building a simple web application to manage appointments, where users can request, approve, and complete appointments. The application uses Node.js, Express.js, Sequelize as the ORM, and PostgreSQL as the database.

## Setup

To run this project locally, follow the steps below:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/ngrifk98/sql-in-practice-lab.git
```

2. Navigate to the project directory:

```bash
cd sql-in-practice-lab
```

3. Install the required dependencies:

```bash
npm install
```

4. Create a PostgreSQL database for the project.

5. Create a `.env` file in the root directory of the project and add the following environment variables with your PostgreSQL database credentials:

```
CONNECTION_STRING=your_postgres_connection_string
SERVER_PORT=3000
```

6. Run the database migrations to set up the tables:

```bash
npx sequelize-cli db:migrate
```

7. Seed the database with sample data (optional):

```bash
npx sequelize-cli db:seed:all
```

## Usage

To start the application, run the following command:

```bash
npm start
```

The server will start running on the specified `SERVER_PORT` in your `.env` file.

## Endpoints

The following endpoints are available in the application:

- `GET /clients`: Get a list of all clients.
- `GET /pending`: Get a list of all pending appointments.
- `GET /upcoming`: Get a list of all upcoming appointments.
- `GET /appt`: Get a list of all past appointments.
- `PUT /approve`: Mark an appointment as approved.
- `PUT /complete`: Mark an appointment as completed.
- `PUT /incomplete`: Mark an appointment as incomplete.

## Contributing

Contributions to this project are welcome. If you find any issues or would like to suggest improvements, please create an issue or submit a pull request.
