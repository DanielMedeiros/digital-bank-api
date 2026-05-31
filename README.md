# Digital Bank API

![NestJS](https://img.shields.io/badge/NestJS-Framework-red)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![License](https://img.shields.io/badge/License-MIT-green)

A modern Digital Banking API built with NestJS, TypeScript, PostgreSQL, Prisma, and Docker.

This project simulates the backend core of a digital bank, implementing real-world financial features such as user registration, JWT authentication, bank accounts, deposits, withdrawals, transfers, transaction tracking, and idempotency protection.

The goal is to build a portfolio project that demonstrates backend engineering practices commonly found in banks, fintechs, and large-scale financial systems.

---

# Overview

This API was designed following modern backend development principles:

- Clean modular architecture
- RESTful APIs
- JWT Authentication
- PostgreSQL database
- Prisma ORM
- Dockerized environment
- Financial transaction consistency
- Idempotent operations
- Structured logging
- Global exception handling

---

# Architecture

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── accounts/
│   └── transactions/
│
├── shared/
│   ├── database/
│   ├── decorators/
│   ├── exceptions/
│   ├── guards/
│   ├── interceptors/
│   └── utils/
│
├── app.module.ts
├── main.ts
```

---

# Tech Stack

### Backend

- NestJS
- Node.js
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- Passport

### Infrastructure

- Docker
- Docker Compose

### Validation

- Class Validator
- Class Transformer

### Logging

- Pino Logger

---

# Project Roadmap

---

## ✅ Phase 1 — Repository Setup

### Goals

- Create GitHub repository
- Configure Git workflow
- Create initial README
- Configure MIT License

### Branch Strategy

```text
main
develop
feature/*
```

---

## ✅ Phase 2 — NestJS Setup

### Goals

- Create NestJS application
- Configure TypeScript
- Configure ESLint
- Configure Prettier
- Configure environment variables

### Main Dependencies

- @nestjs/config
- class-validator
- class-transformer
- bcrypt
- passport
- @nestjs/jwt

---

## ✅ Phase 3 — Docker & PostgreSQL

### Goals

- Configure Docker Compose
- Create PostgreSQL container
- Configure Prisma
- Configure database connection

### Deliverables

- PostgreSQL containerized
- Prisma Client
- Prisma Module
- Initial migrations

---

## ✅ Phase 4 — API Foundation

### Goals

- Global ValidationPipe
- Global Exception Filter
- Structured Logging
- Security Configuration
- API Versioning

### Deliverables

- API versioning
- Pino Logger
- Helmet
- CORS
- Global exception handling

### API Prefix

```text
/api/v1
```

---

## ✅ Phase 5 — User Registration

### Goals

- Create User entity
- User registration endpoint
- Password hashing
- Email uniqueness validation

### Database Entity

#### User

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| name      | String   |
| email     | String   |
| password  | String   |
| createdAt | DateTime |
| updatedAt | DateTime |

### Features

- Email uniqueness validation
- Password hashing with bcrypt

### Endpoint

```http
POST /api/v1/users
```

---

## ✅ Phase 6 — JWT Authentication

### Goals

- User login
- JWT authentication
- Protected routes

### Implementations

- JwtStrategy
- JwtAuthGuard
- Passport JWT

### Endpoints

```http
POST /api/v1/auth/login

GET /api/v1/users/me
```

---

## ✅ Phase 7 — Bank Accounts

### Goals

- Create Account entity
- Automatically create account when user registers
- Associate User and Account

### Database Entity

#### Account

| Field         | Type     |
| ------------- | -------- |
| id            | UUID     |
| accountNumber | String   |
| balance       | Decimal  |
| userId        | UUID     |
| createdAt     | DateTime |
| updatedAt     | DateTime |

### Features

- Automatic account creation
- Initial balance set to zero

### Endpoint

```http
GET /api/v1/accounts/me
```

---

## ✅ Phase 8 — Deposits & Withdrawals

### Goals

- Deposit money
- Withdraw money
- Balance validation

### Features

- Positive value validation
- Insufficient balance protection

### Endpoints

```http
POST /api/v1/accounts/deposit

POST /api/v1/accounts/withdraw
```

### Business Rules

- Withdrawals cannot exceed available balance
- Amount must be greater than zero

---

## ✅ Phase 9 — Account Transfers

### Goals

- Transfer money between accounts
- Register transfer history
- Guarantee transactional consistency

### Database Entity

#### Transaction

| Field         | Type     |
| ------------- | -------- |
| id            | UUID     |
| fromAccountId | UUID     |
| toAccountId   | UUID     |
| amount        | Decimal  |
| createdAt     | DateTime |

### Features

- Atomic transactions
- Automatic rollback
- Balance validation
- Destination account validation

### Endpoint

```http
POST /api/v1/transactions/transfer
```

### Business Rules

- Destination account must exist
- Cannot transfer to the same account
- Must have sufficient balance

### Technical Implementation

```typescript
prisma.$transaction();
```

---

## ✅ Phase 10 — Idempotency & Financial Consistency

### Goals

- Prevent duplicated transfers
- Guarantee request consistency
- Improve financial reliability

### Database Entity

#### IdempotencyKey

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| key       | String   |
| response  | JSON     |
| createdAt | DateTime |

### Features

- Idempotency-Key header support
- Reuse previous responses
- Prevent duplicate transaction processing

### Example

```http
Idempotency-Key: abc-123
```

### Benefits

- Financial safety
- Duplicate protection
- Better user experience

---

# Banking Features

Implemented features:

- User Registration
- JWT Authentication
- Password Hashing
- Automatic Bank Account Creation
- Balance Management
- Deposits
- Withdrawals
- Account Transfers
- Transaction Recording
- Idempotency Protection
- Global Error Handling
- Structured Logging

---

# API Endpoints

## Authentication

```http
POST /api/v1/auth/login
```

---

## Users

```http
POST /api/v1/users

GET /api/v1/users/me
```

---

## Accounts

```http
GET /api/v1/accounts/me

POST /api/v1/accounts/deposit

POST /api/v1/accounts/withdraw
```

---

## Transactions

```http
POST /api/v1/transactions/transfer
```

---

# Database Models

Current entities:

```text
User
Account
Transaction
IdempotencyKey
```

Relationships:

```text
User 1 ─── 1 Account

Account 1 ─── N Transactions (Outgoing)

Account 1 ─── N Transactions (Incoming)
```

---

# Upcoming Features

Planned next phases:

- Bank Statement
- Transaction History
- Transaction Filtering
- Swagger Documentation
- Unit Tests
- Integration Tests
- E2E Tests
- GitHub Actions CI/CD
- Docker Production Setup
- AWS Deployment
- OpenTelemetry
- Health Checks
- Metrics Monitoring
- Observability Dashboard

---

# Project Setup

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/digital_bank"

JWT_SECRET="your-secret-key"

JWT_EXPIRES_IN="1d"
```

---

# Compile and Run the Project

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build

npm run start:prod
```

---

# Run Tests

### Unit Tests

```bash
npm run test
```

### Coverage

```bash
npm run test:cov
```

### E2E Tests

```bash
npm run test:e2e
```

---

# Deployment

Deployment section will be completed in future phases.

Target platforms:

- Railway
- Render
- AWS
- Docker Containers
- Kubernetes (future)

---

# Resources

Official documentation:

- NestJS
- Prisma
- PostgreSQL
- Docker
- Passport
- JWT

Useful references:

- Clean Architecture
- Domain-Driven Design
- OWASP API Security
- Twelve-Factor App

---

# Support

If you find a bug or have a suggestion:

1. Open an Issue
2. Describe the problem
3. Include reproduction steps
4. Attach logs if necessary

---

# Stay in Touch

### LinkedIn

Add your LinkedIn profile here.

### GitHub

Add your GitHub profile here.

---

# License

This project is licensed under the MIT License.

Feel free to use, study, and improve it.

---

Built with ❤️ using NestJS, PostgreSQL, Prisma, and TypeScript.
