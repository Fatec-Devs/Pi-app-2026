import { User, Client, Vehicle, ServiceOrder, InventoryItem, FinancialEntry } from '@types/index';

// Mock user data
export const mockUsers: Record<string, User> = {
  admin1: {
    id: 'user-001',
    name: 'Admin Silva',
    email: 'admin@workshop.com',
    role: 'ADMIN',
    phone: '+55 11 98765-4321',
    active: true,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  client1: {
    id: 'user-002',
    name: 'João Santos',
    email: 'joao@email.com',
    role: 'CLIENT',
    phone: '+55 11 91234-5678',
    active: true,
    createdAt: new Date('2024-02-10').toISOString(),
  },
  client2: {
    id: 'user-003',
    name: 'Maria Oliveira',
    email: 'maria@email.com',
    role: 'CLIENT',
    phone: '+55 11 92468-1357',
    active: true,
    createdAt: new Date('2024-02-20').toISOString(),
  },
};

// Mock client data
export const mockClients: Client[] = [
  {
    id: 'client-001',
    userId: 'user-002',
    document: '12345678900',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    notes: 'Cliente preferencial',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: 'client-002',
    userId: 'user-003',
    document: '98765432100',
    address: 'Avenida Paulista, 1000 - São Paulo, SP',
    notes: 'Pagamento sempre em dia',
    createdAt: new Date('2024-02-20').toISOString(),
    updatedAt: new Date('2024-02-20').toISOString(),
  },
];

// Mock vehicle data
export const mockVehicles: Vehicle[] = [
  {
    id: 'vehicle-001',
    clientId: 'client-001',
    plate: 'ABC-1234',
    brand: 'Ford',
    model: 'Fiesta',
    year: 2020,
    color: 'Branco',
    mileage: 25000,
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString(),
  },
  {
    id: 'vehicle-002',
    clientId: 'client-001',
    plate: 'DEF-5678',
    brand: 'Chevrolet',
    model: 'Prisma',
    year: 2019,
    color: 'Prata',
    mileage: 45000,
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString(),
  },
  {
    id: 'vehicle-003',
    clientId: 'client-002',
    plate: 'GHI-9012',
    brand: 'Volkswagen',
    model: 'Gol',
    year: 2021,
    color: 'Preto',
    mileage: 18000,
    createdAt: new Date('2024-02-25').toISOString(),
    updatedAt: new Date('2024-02-25').toISOString(),
  },
];

// Mock service orders
export const mockServiceOrders: ServiceOrder[] = [
  {
    id: 'order-001',
    clientId: 'client-001',
    vehicleId: 'vehicle-001',
    status: 'CONCLUIDO',
    services: [
      {
        id: 'svc-001',
        description: 'Troca de óleo',
        estimatedHours: 0.5,
        price: 150.0,
      },
      {
        id: 'svc-002',
        description: 'Alinhamento',
        estimatedHours: 1,
        price: 120.0,
      },
    ],
    materials: [
      {
        id: 'mat-001',
        inventoryItemId: 'inv-001',
        name: 'Óleo 5W-30',
        quantity: 4,
        unitCost: 35.0,
        totalCost: 140.0,
      },
    ],
    laborCost: 270.0,
    partsCost: 140.0,
    totalCost: 410.0,
    notes: 'Manutenção preventiva',
    approvedAt: new Date('2024-03-01').toISOString(),
    startedAt: new Date('2024-03-02').toISOString(),
    finishedAt: new Date('2024-03-02').toISOString(),
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date('2024-03-02').toISOString(),
  },
  {
    id: 'order-002',
    clientId: 'client-001',
    vehicleId: 'vehicle-002',
    status: 'EM_EXECUCAO',
    services: [
      {
        id: 'svc-003',
        description: 'Reparo de freio',
        estimatedHours: 2,
        price: 350.0,
      },
    ],
    materials: [
      {
        id: 'mat-002',
        inventoryItemId: 'inv-003',
        name: 'Pastilha de freio',
        quantity: 1,
        unitCost: 280.0,
        totalCost: 280.0,
      },
    ],
    laborCost: 350.0,
    partsCost: 280.0,
    totalCost: 630.0,
    notes: 'Freio travando ao usar',
    approvedAt: new Date('2024-03-05').toISOString(),
    startedAt: new Date('2024-03-06').toISOString(),
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-06').toISOString(),
  },
  {
    id: 'order-003',
    clientId: 'client-002',
    vehicleId: 'vehicle-003',
    status: 'ORCAMENTO',
    services: [
      {
        id: 'svc-004',
        description: 'Revisão geral',
        estimatedHours: 3,
        price: 500.0,
      },
    ],
    materials: [],
    laborCost: 0,
    partsCost: 0,
    totalCost: 0,
    notes: 'Orçamento em análise',
    createdAt: new Date('2024-03-07').toISOString(),
    updatedAt: new Date('2024-03-07').toISOString(),
  },
];

// Mock inventory items
export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'inv-001',
    name: 'Óleo 5W-30',
    sku: 'OLE-5W30-001',
    unit: 'litro',
    quantity: 25,
    minStock: 10,
    unitCost: 35.0,
    active: true,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-03-06').toISOString(),
  },
  {
    id: 'inv-002',
    name: 'Filtro de ar',
    sku: 'FIL-AIR-001',
    unit: 'unidade',
    quantity: 12,
    minStock: 5,
    unitCost: 45.0,
    active: true,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString(),
  },
  {
    id: 'inv-003',
    name: 'Pastilha de freio',
    sku: 'FRE-PAD-001',
    unit: 'jogo',
    quantity: 8,
    minStock: 4,
    unitCost: 280.0,
    active: true,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-03-06').toISOString(),
  },
  {
    id: 'inv-004',
    name: 'Vela de ignição',
    sku: 'IGN-SPARK-001',
    unit: 'jogo',
    quantity: 3,
    minStock: 5,
    unitCost: 120.0,
    active: true,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-03-01').toISOString(),
  },
];

// Mock financial entries
export const mockFinancialEntries: FinancialEntry[] = [
  {
    id: 'fin-001',
    serviceOrderId: 'order-001',
    type: 'INCOME',
    description: 'Serviço - Troca de óleo e alinhamento',
    amount: 410.0,
    category: 'SERVICE',
    date: new Date('2024-03-02').toISOString(),
    createdAt: new Date('2024-03-02').toISOString(),
  },
  {
    id: 'fin-002',
    type: 'EXPENSE',
    description: 'Compra de óleo 5W-30 (24L)',
    amount: 840.0,
    category: 'MAINTENANCE',
    date: new Date('2024-02-28').toISOString(),
    createdAt: new Date('2024-02-28').toISOString(),
  },
  {
    id: 'fin-003',
    type: 'EXPENSE',
    description: 'Aluguel da oficina',
    amount: 2000.0,
    category: 'RENT',
    date: new Date('2024-03-01').toISOString(),
    createdAt: new Date('2024-03-01').toISOString(),
  },
];
