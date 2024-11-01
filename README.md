# Frontend Typescript Challenge


> This challenge comes with a Nest.js server that implements three resources (agents, customers and orders) with their respective CRUD endpoints. These endpoints are protected, so, to consume them, you need to register yourself to get a valid JWT. For your convenience there is already an admin user created with the following credentials:
> - email: caio.fleury.r@gmail.com
> - password: secret

## Table of Contents

- [Frontend Typescript Challenge](#frontend-typescript-challenge)
  - [Table of Contents](#table-of-contents)
  - [**Your Task**](#your-task)
  - [Evaluation Criteria](#evaluation-criteria)
- [Server Documentation](#server-documentation)
  - [Roles](#roles)
  - [Endpoints](#endpoints)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
    - [Setting up MySQL Locally](#setting-up-mysql-locally)
  - [Running Tests](#running-tests)

## **Your Task**

Create a frontend application (SPA or SSR) that consumes the API provided by this project. You are to use React with Typescript and Tailwind CSS, use any other libraries you see fit. The frontend should have a role-based UI/UX, meaning that the user should only see the features that are allowed by their role. The roles are `admin`, `agent`, `customer`, and `guest`.

**Must Have Features**
These features are based on the already provided endpoints and are all required:
- Login, Logout, and Registration
- Role-Based UI/UX – Ensure users see only the features allowed by their roles.
- List Data with Pagination:
   - List agents, customers, and orders
-  CRUD Operations for Orders:
   - Create, update, and delete an order
- Basic Summarization – Show total orders grouped by:
  - Customer, agent, and country
- Unit Tests – For key components and functions

**Should Have Features**
These features are to be considered required for Senior Level candidates, and optional for Mid Level candidates:
- Dockerize the Frontend – Containerize the application to ensure it runs consistently across environments.
- Text-Based Search Feature
- Sort Feature – Allow sorting of orders, customers, or agents based on relevant criteria.

**Optional Features**
These features allow you to demonstrate deeper frontend skills, implement no more than 2:
- Integration Tests – Beyond unit tests, add basic integration tests for major components.
- Frontend Cache with Cache Invalidation – Implement simple client-side caching for efficiency.
- Location-Based Search with Map Component – Include a map to display search results.
- Advanced Feature of Your Choice – Add any other feature you see fit.

## Evaluation Criteria

- Code quality (organized, modular, documented, robust error handling, etc.)
- Code performance (loading times, etc.)
- Code security (data validation, etc.)
- Unit tests (front-end branch coverage % and quality of the tests)
- Integration tests
- Dockerization
- Git history
- Commit messages
- Documentation (i.e. this README)
- UI/UX quality (responsive, accessible, etc.)
- Feature completeness

# Server Documentation

## Roles

- `admin` - has access to all endpoints
- `agent` - has access to all endpoints except the ones related to customers
- `customer` - has access to all endpoints except the ones related to agents
- `guest` - has access only to the endpoints to register and login

## Endpoints

- GET `/api/docs` - Swagger documentation
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Get a new access token with the credentials
- GET `/api/agents` - Get all agents
- POST `/api/agents` - Create a new agent
- GET `/api/agents/{agentCode}` - Get agent by agentCode with its customers
- PATCH `/api/agents/{agentCode}` - Update an existing agents
- DELETE `/api/agents/{agentCode}` - Delete an existing agents by its agentCode
- GET `/api/customers` - Get all customers
- POST `/api/customers` - Create a new customer
- GET `/api/customers/{custCode}` - Get customer by custCode with its agent
- PATCH `/api/customers/{custCode}` - Update an existing customer
- DELETE `/api/customers/{custCode}` - Delete an existing customer by its custCode
- GET `/api/orders/total-amount-by-customer` - Get total amount of orders group by customer
- GET `/api/orders/total-amount-by-agent` - Get total amount of orders group by agent
- GET `/api/orders/total-amount-by-country` - Get total amount of orders group by country
- GET `/api/orders` - Get all orders (paginated)
- POST `/api/orders` - Create a new order
- GET `/api/orders/{ordNum}` - Get an order by ordNum
- PATCH `/api/orders/{ordNum}` - Update an existing order
- DELETE `/api/orders/{ordNum}` - Delete an existing order by its ordNum
- POST `/api/users/assign-role/{id}` - Assign a role to an user by user id
- GET `/api/users` - Get all users (paginated)

## Prerequisites

- [nodejs version 20](https://nodejs.org/en/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`JWT_SECRET`

`DB_HOST`
`DB_PORT`
`DB_USER`
`DB_PASS`
`DB_DATABASE`

And if we want to use docker compose we have to add:

`MYSQL_USER`
`MYSQL_PASSWORD`
`MYSQL_DATABASE`

## Installation

Clone the project

```bash
git clone https://github.com/Resquared/frontend-typescript-challenge
```

Go to the project directory

```bash
cd frontend-typescript-challenge
npm install
```

To start the server (requires mysql and Nest CLI)

```bash
npm run start
```

And if we use docker compose (auto instantiates mysql), instead of the last command, we use

```bash
docker compose up
```

### Setting up MySQL Locally

If you are running the server via the docker compose, this step is not required.  
First make sure you have MySql server installed locally, or on a docker container.
Then to set up the MySQL locally, you can use the following commands:

```bash
sudo mysql
```

```sql
CREATE DATABASE sales;
USE sales;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON sales TO 'user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```bash
sudo mysql -p sales < ./scripts/init-data.sql
```

## Running Tests

To run tests, run the following command

```bash
npm run test     		// Unit Tests
npm run test:e2e 		// Integration Tests
```
