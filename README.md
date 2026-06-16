# Digital Bank API

![CI](https://github.com/DanielMedeiros/digital-bank-api/actions/workflows/ci.yml/badge.svg)
![NestJS](https://img.shields.io/badge/NestJS-Framework-red)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-green)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

A modern Digital Banking API built with NestJS, TypeScript, PostgreSQL, Prisma, and Docker.

This project simulates the backend core of a digital bank, implementing real-world financial features such as user registration, JWT authentication, bank accounts, deposits, withdrawals, transfers, transaction tracking, bank statements, and idempotency protection.

The goal is to build a portfolio project that demonstrates backend engineering practices commonly found in banks, fintechs, and large-scale financial systems.

---

# Table of Contents

- Overview
- Architecture
- Tech Stack
- Project Roadmap
- Banking Features
- Business Rules
- Security
- API Endpoints
- API Coverage
- Domain Model
- Database Models
- Testing Strategy
- Upcoming Features
- Project Setup
- Deployment
- Resources

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
- OpenAPI Documentation

---

# Architecture

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── accounts/
│   ├── transactions/
│   └── statements/
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
└── main.ts

test/
├── unit/
├── integration/
├── e2e/
├── mocks/
├── fixtures/
└── helpers/
```

---

# Tech Stack

## Backend

- NestJS
- Node.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- Passport

## Infrastructure

- Docker
- Docker Compose

## Validation

- Class Validator
- Class Transformer

## Documentation

- Swagger
- OpenAPI

## Logging

- Pino Logger

## Testing

- Jest
- Nest Testing Module

---

# Project Roadmap

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

---

## ✅ Phase 3 — Docker & PostgreSQL

### Goals

- Configure Docker Compose
- Create PostgreSQL container
- Configure Prisma
- Configure database connection

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

---

## ✅ Phase 7 — Bank Accounts

### Goals

- Create Account entity
- Automatically create account when user registers
- Associate User and Account

---

## ✅ Phase 8 — Deposits & Withdrawals

### Goals

- Deposit money
- Withdraw money
- Balance validation

### Features

- Positive value validation
- Insufficient balance protection

---

## ✅ Phase 9 — Account Transfers

### Goals

- Transfer money between accounts
- Register transfer history
- Guarantee transactional consistency

### Features

- Atomic transactions
- Automatic rollback
- Balance validation
- Destination account validation

---

## ✅ Phase 10 — Idempotency & Financial Consistency

### Goals

- Prevent duplicated transfers
- Guarantee request consistency
- Improve financial reliability

### Features

- Idempotency-Key support
- Reuse previous responses
- Prevent duplicate processing

---

## ✅ Phase 10.1 — Transaction Standardization

### Goals

- Standardize all financial operations
- Create a unified transaction history
- Prepare the system for bank statements

### Features

- TransactionType enum
- DEPOSIT transactions
- WITHDRAW transactions
- TRANSFER transactions

### Benefits

- Unified transaction history
- Easier auditing
- Foundation for statements and reporting

---

## ✅ Phase 11 — Bank Statement & Transaction History

### Goals

- Account statement
- Transaction history
- Date filtering
- Incoming and outgoing operations

### Features

- Full transaction history
- Ordered by date
- Date range filtering
- Deposit, Withdraw and Transfer support

### Endpoints

```http
GET /api/v1/statements

GET /api/v1/statements?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

---

## ✅ Phase 12 — Swagger / OpenAPI Documentation

### Goals

- OpenAPI Documentation
- Swagger UI
- JWT Authorization Support

### Endpoint

```text
/api/docs
```

### Features

- Interactive API documentation
- JWT Authentication
- Request examples
- DTO documentation

---

## ✅ Phase 13 — Unit Tests

### Goals

- Validate business rules
- Improve code reliability
- Prevent regressions

### Technologies

- Jest
- NestJS Testing Module

### Covered Services

- AuthService
- AccountsService
- TransactionsService
- StatementsService

---

## ✅ Phase 14 — Integration Tests

### Goals

- Validate complete application flows
- Verify database integration
- Test authentication and financial operations

### Technologies

- Jest
- Supertest
- PostgreSQL Test Database

### Covered Flows

- Register User → Login
- Deposit → Balance Validation
- Transfer → Balance Validation
- Statement Generation

---

## ✅ Phase 15 — End-to-End Tests

### Goals

- Validate complete banking flows
- Simulate real client interactions
- Ensure application reliability

### Technologies

- Jest
- Supertest
- PostgreSQL

### Covered Flows

- Register User
- Login
- Deposit
- Transfer
- Statement

### Status

Completed

---

## ✅ Phase 16 — GitHub Actions CI/CD

### Goals

- Automate quality checks
- Validate code before merging
- Prevent regressions

### Pipeline

- Install Dependencies
- Prisma Generate
- Database Migration
- Lint
- Unit Tests
- Integration Tests
- E2E Tests
- Build

### Technologies

- GitHub Actions
- PostgreSQL
- Prisma

---

## ✅ Phase 17 — Health Checks

### Goals

- Validate application availability
- Validate database connectivity
- Support monitoring tools

### Endpoints

GET /api/v1/health

GET /api/v1/health/database

### Technologies

- NestJS
- Prisma
- PostgreSQL

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
- Transfers
- Transaction History
- Bank Statements
- Idempotency Protection
- OpenAPI Documentation
- Global Error Handling
- Structured Logging
- Unit Tests

---

# Business Rules

## Authentication

- Users authenticate using JWT.
- Protected endpoints require a valid token.

## Accounts

- Each user owns exactly one bank account.
- Accounts are automatically created upon registration.

## Deposits

- Amount must be greater than zero.

## Withdrawals

- Amount must be greater than zero.
- Balance cannot become negative.

## Transfers

- Destination account must exist.
- Users cannot transfer to their own account.
- Origin account must have sufficient balance.

## Idempotency

- Transfers support idempotent requests.
- Repeated requests with the same key return the previous response.

---

# Security

Implemented security mechanisms:

- JWT Authentication
- Password hashing with bcrypt
- Route protection with Guards
- ValidationPipe
- Helmet
- CORS
- Global exception handling
- Idempotency protection

---

# API Endpoints

## Authentication

```http
POST /api/v1/auth/login
```

## Users

```http
POST /api/v1/users

GET /api/v1/users/me
```

## Accounts

```http
GET /api/v1/accounts/me

POST /api/v1/accounts/deposit

POST /api/v1/accounts/withdraw
```

## Transactions

```http
POST /api/v1/transactions/transfer
```

## Statements

```http
GET /api/v1/statements

GET /api/v1/statements?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

---

# API Coverage

| Module                | Status |
| --------------------- | ------ |
| Users                 | ✅     |
| Authentication        | ✅     |
| Accounts              | ✅     |
| Transactions          | ✅     |
| Statements            | ✅     |
| Swagger Documentation | ✅     |
| Unit Tests            | ✅     |
| Integration Tests     | ✅     |
| E2E Tests             | ✅     |
| CI/CD                 | ✅     |
| AWS Deployment        | 🚧     |

---

# Domain Model

```text
User
 │
 └── Account
      │
      ├── Transactions (Outgoing)
      │
      └── Transactions (Incoming)

Transaction
 ├── DEPOSIT
 ├── WITHDRAW
 └── TRANSFER

IdempotencyKey
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

Transaction Types:

```text
DEPOSIT
WITHDRAW
TRANSFER
```

---

# Testing Strategy

Current coverage:

- Unit Tests

Covered services:

- AuthService
- AccountsService
- TransactionsService
- StatementsService

Planned:

- Integration Tests
- E2E Tests

Testing tools:

- Jest
- NestJS Testing Module

---

# Upcoming Features

Planned next phases:

- Integration Tests
- E2E Tests
- GitHub Actions CI/CD
- Health Checks
- Metrics Monitoring
- OpenTelemetry
- Docker Production Setup
- AWS Deployment
- Clean Architecture Refactoring
- Event-Driven Architecture
- Financial Ledger System

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

## Development

```bash
npm run start:dev
```

## Production

```bash
npm run build

npm run start:prod
```

---

# Run Tests

## Unit Tests

```bash
npm run test
```

## Watch Mode

```bash
npm run test:watch
```

## Coverage

```bash
npm run test:cov
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
- Swagger

Useful references:

- Clean Architecture
- Domain-Driven Design
- OWASP API Security
- Twelve-Factor App
- OpenAPI Specification
- Financial Systems Design

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

Built with ❤️ using NestJS, PostgreSQL, Prisma, TypeScript, and modern backend engineering practices.
