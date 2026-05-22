# Pi-app-2026 — Arquitetura Base (MVP em 14 dias)

## 1) Visão geral
Sistema mobile para gestão de oficina automotiva com:
- **Frontend:** React Native + Expo + TypeScript
- **Backend:** Node.js + Express + TypeScript + MongoDB/Mongoose
- **Auth:** JWT (access token)

Objetivo: arquitetura simples, profissional, escalável e rápida para equipe acadêmica de 5 pessoas em 14 dias.

---

## 2) Arquitetura proposta

### Estilo
- **Monorepo simples** com duas apps:
  - `frontend/`
  - `backend/`
- Backend em módulos por domínio (clientes, veículos, ordens, estoque, financeiro, auth).
- Frontend organizado por telas + componentes reutilizáveis + serviços de API.

### Padrões de projeto
- Controller → Service → Repository (backend)
- DTOs + validação de entrada
- Regras de negócio centralizadas em Services
- Tipagem forte com TypeScript em todas as camadas

---

## 3) Estrutura de pastas

```txt
.
├── frontend/
│   ├── src/
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   ├── client/
│   │   │   └── admin/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── forms/
│   │   │   └── cards/
│   │   ├── routes/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── styles/
│   └── app.json
└── backend/
    ├── src/
    │   ├── modules/
    │   │   ├── auth/
    │   │   ├── clients/
    │   │   ├── vehicles/
    │   │   ├── service-orders/
    │   │   ├── inventory/
    │   │   └── finance/
    │   ├── controllers/
    │   ├── services/
    │   ├── repositories/
    │   ├── middlewares/
    │   ├── routes/
    │   ├── database/
    │   ├── config/
    │   ├── types/
    │   └── app.ts
    └── package.json
```

---

## 4) Domínio e Models (MongoDB/Mongoose)

### `User`
- `name`, `email`, `passwordHash`, `role` (`ADMIN | CLIENT`), `phone`, `active`

### `Client`
- `userId`, `document`, `address`, `notes`

### `Vehicle`
- `clientId`, `plate`, `brand`, `model`, `year`, `color`, `mileage`

### `ServiceOrder`
- `clientId`, `vehicleId`, `status`, `services[]`, `materials[]`, `laborCost`, `partsCost`, `totalCost`, `approvedAt`, `startedAt`, `finishedAt`

### `InventoryItem`
- `name`, `sku`, `unit`, `quantity`, `minStock`, `unitCost`, `active`

### `FinancialEntry`
- `serviceOrderId`, `type` (`INCOME | EXPENSE`), `description`, `amount`, `date`, `category`

---

## 5) Types/Interfaces principais (TypeScript)

```ts
export type UserRole = 'ADMIN' | 'CLIENT';
export type ServiceOrderStatus = 'ORCAMENTO' | 'APROVADO' | 'EM_EXECUCAO' | 'CONCLUIDO';

export interface ServiceItemInput {
  description: string;
  estimatedHours: number;
  price: number;
}

export interface MaterialUsageInput {
  inventoryItemId: string;
  quantity: number;
  unitCost: number;
}

export interface CreateServiceOrderDTO {
  clientId: string;
  vehicleId: string;
  services: ServiceItemInput[];
  notes?: string;
}
```

---

## 6) Rotas REST (padrão profissional)

### Auth
- `POST /auth/login`
- `POST /auth/register-client`
- `GET /auth/me`

### Clientes
- `GET /clients`
- `GET /clients/:id`
- `POST /clients`
- `PUT /clients/:id`
- `DELETE /clients/:id`

### Veículos
- `GET /vehicles`
- `GET /vehicles/:id`
- `POST /vehicles`
- `PUT /vehicles/:id`
- `DELETE /vehicles/:id`

### Ordens de Serviço
- `GET /service-orders`
- `GET /service-orders/:id`
- `POST /service-orders`
- `PATCH /service-orders/:id/status`
- `PATCH /service-orders/:id/materials`
- `PATCH /service-orders/:id/costs`
- `GET /service-orders/client/:clientId/history`

### Estoque
- `GET /inventory`
- `POST /inventory`
- `PUT /inventory/:id`
- `PATCH /inventory/:id/adjust`

### Financeiro
- `GET /finance/summary`
- `GET /finance/entries`
- `POST /finance/entries`

---

## 7) Responsabilidades por camada (backend)

- **Routes:** mapeamento endpoint → controller
- **Controllers:** parse da request/response + status code
- **Services:** regras de negócio (transições de status, estoque, custo)
- **Repositories:** persistência MongoDB
- **Middlewares:** auth JWT, autorização por perfil, tratamento de erro

---

## 8) Regras de negócio críticas

1. Toda OS deve estar vinculada a cliente e veículo.
2. Toda OS deve possuir ao menos um serviço.
3. Estoque atualizado automaticamente no registro de materiais.
4. Bloquear material sem estoque suficiente.
5. OS só pode ser `CONCLUIDO` se `laborCost`/`partsCost`/`totalCost` estiverem registrados.
6. Fluxo obrigatório de status:
   - `ORCAMENTO` → `APROVADO` → `EM_EXECUCAO` → `CONCLUIDO`
7. Só iniciar execução após aprovação do orçamento.
8. Registro de materiais + baixa de estoque deve seguir estratégia única definida no setup (primeiros 2 dias): **(A)** transação atômica com MongoDB replica set (preferencial) ou **(B)** compensação manual no MVP (reverter material da OS se falhar baixa de estoque), com migração planejada para transaction.

---

## 9) Fluxo de autenticação

1. Login (`email/senha`) em `/auth/login`.
2. Backend retorna `accessToken` + dados do usuário.
3. Frontend salva token em storage seguro.
4. `AuthContext` injeta token no Axios interceptor.
5. Rotas e telas protegidas por perfil (`ADMIN`/`CLIENT`).

---

## 10) Fluxo de telas

### Cliente
- Login
- Home Cliente (resumo)
- Solicitar Serviço
- Minhas OS (lista)
- Detalhe da OS (status timeline)
- Histórico

### Admin
- Login
- Dashboard Admin
- Clientes (CRUD)
- Veículos (CRUD)
- Ordens de Serviço (criar/editar/status)
- Estoque
- Financeiro (resumo + lançamentos)

---

## 11) Componentes reutilizáveis (frontend)

- `AppButton`
- `AppInput`
- `AppSelect`
- `StatusBadge`
- `ServiceOrderCard`
- `EmptyState`
- `LoadingOverlay`
- `ConfirmDialog`
- `MoneyText`

---

## 12) Boas práticas e padronização

- ESLint + Prettier + EditorConfig
- Commits curtos e semânticos (`feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `style`)
- DTOs para entrada e saída
- Nunca acessar Mongo direto no Controller
- Senhas sempre com hash seguro (`bcrypt`) + salt (`saltRounds` configurável via ambiente, recomendado iniciar com 10 no MVP; 10-12 como faixa segura), nunca armazenar senha em texto puro
- Evitar `saltRounds` acima de 12 sem teste de carga, pois pode degradar tempo de login/cadastro
- Definir `BCRYPT_SALT_ROUNDS` em variável de ambiente (fallback seguro no backend) e executar hash no **Auth Service**, não em controller/repository
- Erros padronizados (`code`, `message`, `details`)
- Nomes consistentes:
  - `camelCase` (variáveis/funções)
  - `PascalCase` (componentes/classes/types)

---

## 13) UI/UX (rápido para produzir)

- Design limpo com cards, listas e filtros simples
- Cores de status:
  - Orçamento: cinza
  - Aprovado: azul
  - Em execução: laranja
  - Concluído: verde
- Timeline visual no detalhe da OS
- Indicador de estoque mínimo (badge vermelho)

---

## 14) Estratégia de Git (5 pessoas)

- Branch principal: `main`
- Integração: `develop`
- Trabalho: `feature/<modulo-nome>`
- Correções: `fix/<assunto>`
- Pull Request obrigatório para `develop`
- Checklist mínimo no PR: build ok, testes básicos, review 1 colega

---

## 15) Divisão de tarefas (equipe de 5)

1. **Pessoa A (Backend Auth/Clientes):** auth, users, clients
2. **Pessoa B (Backend OS/Estoque):** service-orders, inventory, regras críticas
3. **Pessoa C (Backend Finance/Integração):** finance, relatórios básicos, validações finais
4. **Pessoa D (Frontend Cliente):** fluxo cliente + integração API
5. **Pessoa E (Frontend Admin):** dashboard admin, CRUDs, estoque/financeiro

Todos colaboram em testes manuais integrados e refinamento final.

---

## 16) Cronograma de 14 dias

- **Dias 1-2:** setup projeto (Dia 1: configuração inicial + auth base + estrutura; Dia 2: banco e estratégia de consistência de estoque: replica set ou compensação manual)
- **Dias 3-5:** clientes/veículos + telas base
- **Dias 6-8:** ordens de serviço + fluxo de status
- **Dias 9-10:** estoque + vínculo materiais/custos
- **Dias 11-12:** financeiro básico + histórico
- **Dia 13:** testes integrados, correções, polimento UI
- **Dia 14:** preparação demo/apresentação

---

## 17) MVP ideal (obrigatório para entrega)

- Login com perfil
- CRUD cliente e veículo
- Criar OS com serviços
- Aprovar OS e mover status corretamente
- Registrar materiais com baixa em estoque
- Calcular custos totais automaticamente
- Consultar histórico do cliente

---

## 18) Funcionalidades opcionais (para impressionar)

- Upload de fotos do veículo/serviço
- Notificação push em mudança de status
- Assinatura digital na aprovação do orçamento
- Relatório mensal simples (PDF)
- Dashboard com gráficos (receita vs custos)

---

## 19) Próximo passo recomendado

Com esta base, iniciar implementação em camadas (Auth → Cadastros → OS → Estoque → Financeiro), mantendo MVP estável desde a primeira semana.
