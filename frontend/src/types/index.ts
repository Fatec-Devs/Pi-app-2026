// Auth types
export type UserRole = 'ADMIN' | 'CLIENT';
export type ServiceOrderStatus = 'ORCAMENTO' | 'APROVADO' | 'EM_EXECUCAO' | 'CONCLUIDO';
export type FinancialEntryType = 'INCOME' | 'EXPENSE';
export type FinancialCategory = 'SERVICE' | 'MAINTENANCE' | 'FUEL' | 'RENT' | 'UTILITIES' | 'OTHER';

// User/Auth DTOs
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  active: boolean;
  createdAt: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  user: User;
}

export interface RegisterClientDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Client
export interface Client {
  id: string;
  userId: string;
  document: string;
  address: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientDTO {
  document: string;
  address: string;
  notes?: string;
}

export interface UpdateClientDTO {
  document?: string;
  address?: string;
  notes?: string;
}

// Vehicle
export interface Vehicle {
  id: string;
  clientId: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleDTO {
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
}

export interface UpdateVehicleDTO {
  plate?: string;
  brand?: string;
  model?: string;
  year?: number;
  color?: string;
  mileage?: number;
}

// Service Order
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

export interface ServiceOrderItem {
  id: string;
  description: string;
  estimatedHours: number;
  price: number;
}

export interface MaterialUsage {
  id: string;
  inventoryItemId: string;
  name: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface ServiceOrder {
  id: string;
  clientId: string;
  vehicleId: string;
  status: ServiceOrderStatus;
  services: ServiceOrderItem[];
  materials: MaterialUsage[];
  laborCost: number;
  partsCost: number;
  totalCost: number;
  notes?: string;
  approvedAt?: string;
  startedAt?: string;
  finishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceOrderDTO {
  clientId: string;
  vehicleId: string;
  services: ServiceItemInput[];
  notes?: string;
}

export interface UpdateServiceOrderStatusDTO {
  status: ServiceOrderStatus;
}

export interface UpdateServiceOrderMaterialsDTO {
  materials: MaterialUsageInput[];
}

export interface UpdateServiceOrderCostsDTO {
  laborCost: number;
  partsCost: number;
}

// Inventory
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  unit: string;
  quantity: number;
  minStock: number;
  unitCost: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryItemDTO {
  name: string;
  sku: string;
  unit: string;
  quantity: number;
  minStock: number;
  unitCost: number;
}

export interface UpdateInventoryItemDTO {
  name?: string;
  sku?: string;
  unit?: string;
  minStock?: number;
  unitCost?: number;
  active?: boolean;
}

export interface AdjustInventoryDTO {
  quantity: number;
  reason: string;
}

// Financial
export interface FinancialEntry {
  id: string;
  serviceOrderId?: string;
  type: FinancialEntryType;
  description: string;
  amount: number;
  category: FinancialCategory;
  date: string;
  createdAt: string;
}

export interface CreateFinancialEntryDTO {
  serviceOrderId?: string;
  type: FinancialEntryType;
  description: string;
  amount: number;
  category: FinancialCategory;
  date: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  period: string;
}

// API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
