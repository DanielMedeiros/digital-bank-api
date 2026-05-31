# Digital Bank API

API de Conta Digital inspirada em arquiteturas modernas de fintechs, desenvolvida com NestJS, TypeScript, PostgreSQL, Prisma e Docker.

O objetivo deste projeto é simular o núcleo de um banco digital, implementando funcionalidades reais como autenticação JWT, contas bancárias, depósitos, saques, transferências entre contas, histórico de transações e mecanismos de consistência financeira.

---

# Arquitetura

Tecnologias utilizadas:

- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Prisma ORM
- Docker
- JWT Authentication
- Passport
- Pino Logger
- Class Validator

Estrutura do projeto:

src/
├── modules/
│ ├── auth/
│ ├── users/
│ ├── accounts/
│ └── transactions/
│
├── shared/
│ ├── database/
│ ├── decorators/
│ ├── exceptions/
│ ├── guards/
│ ├── interceptors/
│ └── utils/

---

# Roadmap do Projeto

## ✅ Etapa 1 — Criação do Repositório

Objetivos:

- Criar repositório GitHub
- Definir estratégia de branches
- Configurar README inicial
- Configurar licença MIT

Estratégia de branches:

- main
- develop
- feature/\*

---

## ✅ Etapa 2 — Setup do NestJS

Objetivos:

- Criar projeto NestJS
- Configurar TypeScript
- Configurar ESLint
- Configurar Prettier
- Configurar variáveis de ambiente

Dependências principais:

- @nestjs/config
- class-validator
- class-transformer
- bcrypt
- passport
- @nestjs/jwt

---

## ✅ Etapa 3 — Docker e PostgreSQL

Objetivos:

- Configurar Docker Compose
- Subir PostgreSQL localmente
- Integrar banco de dados ao projeto
- Inicializar Prisma ORM

Implementações:

- PostgreSQL containerizado
- Prisma Client
- Migrations
- Prisma Module global

---

## ✅ Etapa 4 — Configuração Global da API

Objetivos:

- ValidationPipe global
- ConfigModule global
- Logger estruturado
- Tratamento global de exceções
- Helmet
- CORS
- Versionamento da API

Recursos implementados:

- /api/v1
- Exception Filter
- Pino Logger
- Segurança HTTP

---

## ✅ Etapa 5 — Cadastro de Usuários

Objetivos:

- Criar entidade User
- Criar módulo Users
- Cadastro de usuários
- Hash de senha

Implementações:

Tabela:

User

Campos:

- id
- name
- email
- password
- createdAt
- updatedAt

Validações:

- Email único
- Senha mínima
- Hash bcrypt

Endpoints:

POST /api/v1/users

---

## ✅ Etapa 6 — Autenticação JWT

Objetivos:

- Login
- JWT
- Rotas protegidas

Implementações:

- JwtStrategy
- JwtAuthGuard
- Passport JWT

Endpoints:

POST /api/v1/auth/login

GET /api/v1/users/me

---

## ✅ Etapa 7 — Conta Bancária

Objetivos:

- Criar entidade Account
- Relacionar User ↔ Account
- Criar conta automaticamente

Tabela:

Account

Campos:

- id
- accountNumber
- balance
- userId
- createdAt
- updatedAt

Endpoints:

GET /api/v1/accounts/me

---

## ✅ Etapa 8 — Depósito e Saque

Objetivos:

- Movimentação financeira
- Atualização de saldo
- Validação de saldo

Implementações:

- DepositDto
- WithdrawDto

Endpoints:

POST /api/v1/accounts/deposit

POST /api/v1/accounts/withdraw

Regras:

- Não permite saque sem saldo
- Valores positivos obrigatórios

---

## ✅ Etapa 9 — Transferências Entre Contas

Objetivos:

- Transferir saldo entre usuários
- Registrar histórico
- Garantir consistência

Tabela:

Transaction

Campos:

- id
- fromAccountId
- toAccountId
- amount
- createdAt

Endpoints:

POST /api/v1/transactions/transfer

Regras:

- Conta destino deve existir
- Não pode transferir para si mesmo
- Deve possuir saldo suficiente

Implementação:

- Prisma Transaction ($transaction)
- Rollback automático

---

## ✅ Etapa 10 — Idempotência e Consistência

Objetivos:

- Evitar transferências duplicadas
- Garantir consistência financeira
- Preparar sistema para cenários concorrentes

Tabela:

IdempotencyKey

Campos:

- id
- key
- response
- createdAt

Implementações:

- Header Idempotency-Key
- Reutilização de resposta anterior
- Bloqueio de processamento duplicado

Exemplo:

Idempotency-Key: abc-123

Benefícios:

- Segurança financeira
- Prevenção de duplicidade
- Melhor experiência para clientes

---

# Funcionalidades Implementadas

- Cadastro de usuários
- Login JWT
- Consulta de perfil
- Conta bancária automática
- Consulta de saldo
- Depósito
- Saque
- Transferência
- Histórico de transações
- Idempotência
- Tratamento global de erros
- Logs estruturados

---

# Project setup

```bash
npm install
```

---

# Compile and run the project

Development

```bash
npm run start:dev
```

Production

```bash
npm run build
npm run start:prod
```

---

# Run tests

Unit tests

```bash
npm run test
```

Coverage

```bash
npm run test:cov
```

E2E tests

```bash
npm run test:e2e
```

---

# Deployment

Em construção.

Planejamento:

- Docker
- GitHub Actions
- Railway
- Render
- AWS

---

# Resources

Documentações úteis:

- NestJS
- Prisma
- PostgreSQL
- Docker
- JWT
- Passport

---

# Support

Caso encontre algum problema:

1. Abra uma Issue
2. Documente os passos para reproduzir
3. Informe logs e mensagens de erro

---

# Stay in touch

LinkedIn:
(adicionar perfil)

GitHub:
(adicionar perfil)

---

# License

MIT License
