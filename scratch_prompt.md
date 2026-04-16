# FLEXPro ERP - System Architecture & Build Prompt

You are a Senior Enterprise Software Architect and Lead Developer. Your task is to architect and build a professional, enterprise-grade ERP system called **FLEXPro ERP** based on the provided Software Requirements Specification (SRS).

## 🏗 System Architecture Guidelines
1. **Architecture Style**: Microservices-inspired Monolith (Modular Monolith) with clear separation of concerns, allowing for future microservices migration.
2. **Design Patterns**: 
    - Repository Pattern for data access.
    - Service Layer for business logic.
    - Controller Pattern for API endpoints.
    - Factory Pattern for complex object creation.
3. **Scalability**: Multi-branch support with branch-level data isolation using Row Level Security (RLS) or dedicated branch IDs.
4. **Security**: MFA, AES-256 encryption for sensitive data, and comprehensive Role-Based Access Control (RBAC).

## 🛠 Technology Stack
- **Frontend**: React.js 18+, TypeScript, Tailwind CSS, Lucide React (icons), Framer Motion (animations).
- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: PostgreSQL (Relational) with Prisma or TypeORM.
- **Caching/Real-time**: Redis and WebSockets (Socket.io) for real-time dashboard updates and low-stock alerts.
- **Infra**: Dockerized environment, CI/CD ready.

## 📄 Reference Document (SRS)
(See the full SRS document in the project for details)

## 🎯 Implementation Goals
1. **Project Structure**: Setup a clean monorepo or dual-repo structure.
2. **Core Modules**:
    - **Sales/POS**: High-performance checkout, multi-payment, tax engine.
    - **Inventory**: Real-time tracking, Inter-branch transfers, Batch/Serial tracking.
    - **Finance**: Automated General Ledger, P&L, Tax reporting.
    - **CRM**: Customer profiles, loyalty programs.
3. **UI/UX**: Implement a "Clean Enterprise" aesthetic with a responsive sidebar navigation, dashboard widgets (Bento Box style), and high-density data grids.

Please start by outlining the project file structure and the initial database schema migrations, then proceed to the core infrastructure setup.
