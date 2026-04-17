# Project Structure
```
server/src/
├── config/db.ts
├── utils/
|   |── validation.ts
|   └── __tests__/
│       └── {util}.test.ts
├── modules/{feature}/
│   ├── {feature}.route.ts
│   ├── {feature}.service.ts
│   ├── {feature}.repository.ts
│   ├── {feature}.dto.ts
│   └── __tests__/
│       ├── {feature}.service.test.ts
│       ├── {feature}.integration.test.ts

client/src/
├── pages/{Feature}Page.tsx
├── components/ui/
├── api/{feature}.api.ts
├── __tests__/
```

# Layer Responsibilities
| Layer       | Responsibility                          |
|-------------|-----------------------------------------|
| Route       | HTTP request/response only              |
| Service     | Business logic, SRS logic               |
| Repository  | Mongo queries ONLY                      |
