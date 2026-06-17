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

A production-oriented Digital Banking API built with NestJS, TypeScript, PostgreSQL, Prisma, Docker, and modern observability practices.

This project simulates the backend core of a digital bank, implementing real-world financial features such as user registration, JWT authentication, bank accounts, deposits, withdrawals, transfers, transaction tracking, bank statements, idempotency protection, health checks, and observability metrics.

The goal is to demonstrate backend engineering practices commonly used in banks, fintechs, and large-scale financial systems.

---

# Table of Contents

- Overview
- Architecture
- Tech Stack
- Project Roadmap
- Banking Features
- Business Rules
- Security
- Observability & Monitoring
- API Endpoints
- API Coverage
- Domain Model
- Database Models
- Testing Strategy
- Upcoming Features
- Project Setup
- Deployment
- Resources
- Support
- License

---

# Overview

This API was designed following modern backend engineering principles:

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
- OpenAPI documentation
- Health checks
- Metrics & observability

---

# Architecture

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── accounts/
│   ├── transactions/
│   ├── statements/
│   ├── health/
│   └── metrics/
│
├── common/
│   └── middleware/
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
- GitHub Actions

## Validation

- Class Validator
- Class Transformer

## Documentation

- Swagger
- OpenAPI

## Logging & Monitoring

- Pino Logger
- Prometheus Metrics
- Request Correlation

## Testing

- Jest
- Supertest
- Nest Testing Module

---

# Project Roadmap

## ✅ Phase 1 — Repository Setup

- GitHub repository
- Git workflow
- README
- MIT License

## ✅ Phase 2 — NestJS Setup

- NestJS app
- TypeScript
- ESLint
- Prettier
- Environment config

## ✅ Phase 3 — Docker & PostgreSQL

- Docker Compose
- PostgreSQL container
- Prisma setup

## ✅ Phase 4 — API Foundation

- ValidationPipe
- Exception Filter
- Pino Logger
- Helmet
- CORS
- Versioning

## ✅ Phase 5 — User Registration

- User entity
- Registration endpoint
- Password hashing
- Email uniqueness

## ✅ Phase 6 — JWT Authentication

- Login
- JWT Strategy
- Guards

## ✅ Phase 7 — Bank Accounts

- Account entity
- Auto account creation
- User ↔ Account relation

## ✅ Phase 8 — Deposits & Withdrawals

- Deposit
- Withdraw
- Balance validation

## ✅ Phase 9 — Account Transfers

- Transfers
- Atomic transactions
- Rollback support

## ✅ Phase 10 — Idempotency

- Idempotency-Key
- Duplicate prevention

## ✅ Phase 10.1 — Transaction Standardization

- Transaction enum
- Unified history

## ✅ Phase 11 — Bank Statements

- Statement endpoint
- Filters by date
- Full history

## ✅ Phase 12 — Swagger

- OpenAPI
- Interactive docs
- JWT support

## ✅ Phase 13 — Unit Tests

- Service layer tests

## ✅ Phase 14 — Integration Tests

- Full module testing

## ✅ Phase 15 — E2E Tests

- Full banking flow

## ✅ Phase 16 — CI/CD

- GitHub Actions
- Lint
- Tests
- Build

## ✅ Phase 17 — Health Checks

Endpoints:

- GET /api/v1/health
- GET /api/v1/health/database

## ✅ Phase 18 — Observability & Metrics

Features:

- Request ID
- Structured logging
- Prometheus metrics
- Business metrics
- Latency metrics

---

# Banking Features

Implemented features:

- User Registration
- JWT Authentication
- Password Hashing
- Automatic Bank Account Creation
- Deposits
- Withdrawals
- Transfers
- Transaction History
- Bank Statements
- Idempotency Protection
- Swagger Documentation
- Health Checks
- Metrics Monitoring

---

# Business Rules

## Authentication

- Users authenticate using JWT
- Protected endpoints require valid token

## Accounts

- Each user owns exactly one account
- Accounts are automatically created upon registration

## Deposits

- Amount must be greater than zero

## Withdrawals

- Amount must be greater than zero
- Balance cannot become negative

## Transfers

- Destination account must exist
- Users cannot transfer to their own account
- Origin account must have sufficient balance

## Idempotency

- Same key = same response
- Duplicate transfers are prevented

---

# Security

Implemented security mechanisms:

- JWT Authentication
- Password hashing with bcrypt
- Route Guards
- ValidationPipe
- Input validation via DTOs
- Helmet security headers
- CORS
- Global exception handling
- Idempotency protection
- Request correlation via Request ID

---

# Observability & Monitoring

Implemented observability features:

- Structured JSON logs
- Request correlation
- Prometheus metrics
- Business counters
- Latency tracking
- Health checks

Metrics examples:

```text
http_requests_total
bank_transfers_total
bank_deposits_total
bank_withdrawals_total
```

Endpoints:

```http
GET /metrics
GET /api/v1/health
GET /api/v1/health/database
```

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

## Health

```http
GET /api/v1/health
GET /api/v1/health/database
```

## Metrics

```http
GET /metrics
```

---

# API Coverage

| Module            | Status |
| ----------------- | ------ |
| Users             | ✅     |
| Authentication    | ✅     |
| Accounts          | ✅     |
| Transactions      | ✅     |
| Statements        | ✅     |
| Swagger           | ✅     |
| Unit Tests        | ✅     |
| Integration Tests | ✅     |
| E2E Tests         | ✅     |
| CI/CD             | ✅     |
| Health Checks     | ✅     |
| Observability     | ✅     |
| AWS Deployment    | 🚧     |

---

# Domain Model

```text
User
 └── Account
      ├── Transactions (Outgoing)
      └── Transactions (Incoming)

Transaction
 ├── DEPOSIT
 ├── WITHDRAW
 └── TRANSFER

IdempotencyKey
```

---

# Database Models

Entities:

- User
- Account
- Transaction
- IdempotencyKey

Relationships:

```text
User 1 ─── 1 Account
Account 1 ─── N Transactions
```

---

# Testing Strategy

Coverage includes:

## Unit Tests

- AuthService
- AccountsService
- TransactionsService
- StatementsService

## Integration Tests

- Auth flow
- Accounts flow
- Transfers
- Statements
- Health

## E2E Tests

- Register
- Login
- Deposit
- Transfer
- Statement

Testing tools:

- Jest
- Supertest
- Nest Testing Module

---

# Upcoming Features

Planned future phases:

- OpenTelemetry Distributed Tracing
- Grafana Dashboards
- Docker Production Setup
- AWS Deployment
- Kubernetes
- Redis Caching
- Kafka Event Streaming
- Clean Architecture Refactor
- Event-Driven Architecture
- Double-entry Ledger System

---

# Project Setup

Install dependencies:

```bash
npm install
```

Environment variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/digital_bank"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1d"
```

---

# Compile and Run

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

## Unit

```bash
npm run test
```

## Integration

```bash
npm run test:integration
```

## E2E

```bash
npm run test:e2e
```

## Coverage

```bash
npm run test:cov
```

---

# Deployment

Planned target platforms:

- Railway
- Render
- AWS ECS
- Docker
- Kubernetes

---

# Resources

Recommended references:

- NestJS Docs
- Prisma Docs
- OWASP API Security
- OpenAPI Specification
- Clean Architecture
- Domain-Driven Design
- Designing Data-Intensive Applications

---

# Support

If you find a bug or have suggestions:

1. Open an issue
2. Describe the problem
3. Include reproduction steps
4. Attach logs if necessary

---

# License

This project is licensed under the MIT License.

Built with ❤️ using NestJS, PostgreSQL, Prisma, TypeScript, and modern backend engineering practices.
