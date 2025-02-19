src/
├── common/ # Shared utilities, guards, pipes, filters, etc.
│ ├── decorators/ # Custom decorators
│ ├── filters/ # Exception filters
│ ├── guards/ # Authentication/authorization guards
│ ├── interceptors/ # Interceptors
│ ├── middleware/ # Global middleware
│ ├── pipes/ # Custom pipes
│ └── utils/ # Utility functions
│
├── config/ # Configuration files (e.g., database, auth)
│ └── configuration.ts # Configuration setup
│
├── modules/ # Feature modules (e.g., projects, users)
│ ├── projects/ # Projects module
│ │ ├── dto/ # Data Transfer Objects (DTOs)
│ │ ├── entities/ # TypeORM entities
│ │ ├── interfaces/ # Interfaces
│ │ ├── projects.controller.ts
│ │ ├── projects.service.ts
│ │ ├── projects.module.ts
│ │ └── projects.repository.ts
│ │
│ └── users/ # Users module (example)
│ ├── dto/
│ ├── entities/
│ ├── interfaces/
│ ├── users.controller.ts
│ ├── users.service.ts
│ ├── users.module.ts
│ └── users.repository.ts
│
├── app.controller.ts # Root controller
├── app.service.ts # Root service
├── app.module.ts # Root module
└── main.ts # Application entry point
