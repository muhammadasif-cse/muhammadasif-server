src/
├── auth/ # Authentication module
│ ├── dto/ # DTOs for auth (e.g., login, register)
│ ├── entities/ # Auth-related entities (e.g., User)
│ ├── guards/ # Auth guards (e.g., JWT, Roles)
│ ├── strategies/ # Auth strategies (e.g., JWT, Local)
│ ├── interfaces/ # Interfaces for auth
│ ├── auth.controller.ts # Auth controller
│ ├── auth.service.ts # Auth service
│ ├── auth.module.ts # Auth module
│ └── auth.repository.ts # Auth repository
│
├── common/ # Shared utilities and tools
│ ├── decorators/ # Custom decorators
│ ├── filters/ # Exception filters
│ ├── guards/ # Global guards
│ ├── interceptors/ # Interceptors
│ ├── middleware/ # Global middleware
│ ├── pipes/ # Custom pipes
│ └── utils/ # Utility functions
│
├── config/ # Configuration files
│ ├── database.config.ts # Database configuration
│ ├── auth.config.ts # Auth configuration (e.g., JWT)
│ └── app.config.ts # General app configuration
│
├── core/ # Core application logic
│ ├── entities/ # Core entities (e.g., BaseEntity)
│ ├── repositories/ # Base repositories
│ ├── services/ # Core services
│ └── interfaces/ # Core interfaces
│
├── modules/ # Feature modules
│ ├── users/ # Users module
│ │ ├── dto/ # DTOs for users
│ │ ├── entities/ # User entity
│ │ ├── interfaces/ # Interfaces for users
│ │ ├── users.controller.ts # Users controller
│ │ ├── users.service.ts # Users service
│ │ ├── users.module.ts # Users module
│ │ └── users.repository.ts # Users repository
│ │
│ ├── projects/ # Projects module
│ │ ├── dto/ # DTOs for projects
│ │ ├── entities/ # Project entity
│ │ ├── interfaces/ # Interfaces for projects
│ │ ├── projects.controller.ts # Projects controller
│ │ ├── projects.service.ts # Projects service
│ │ ├── projects.module.ts # Projects module
│ │ └── projects.repository.ts # Projects repository
│ │
│ └── tasks/ # Tasks module (example)
│ ├── dto/ # DTOs for tasks
│ ├── entities/ # Task entity
│ ├── interfaces/ # Interfaces for tasks
│ ├── tasks.controller.ts # Tasks controller
│ ├── tasks.service.ts # Tasks service
│ ├── tasks.module.ts # Tasks module
│ └── tasks.repository.ts # Tasks repository
│
├── migrations/ # TypeORM migrations
│ └── 1234567890-create-users-table.ts
│
├── seeds/ # Database seeders
│ └── users.seeder.ts # Example seeder for users
│
├── tests/ # Test files
│ ├── e2e/ # End-to-end tests
│ │ └── app.e2e-spec.ts
│ ├── unit/ # Unit tests
│ │ └── users.service.spec.ts
│ └── integration/ # Integration tests
│ └── auth.controller.spec.ts
│
├── app.controller.ts # Root controller
├── app.service.ts # Root service
├── app.module.ts # Root module
└── main.ts # Application entry point
