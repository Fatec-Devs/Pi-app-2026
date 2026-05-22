import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse, LoginDTO, LoginResponseDTO, User } from '@types/index';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private client: AxiosInstance;
  private accessToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError) => {
        const apiError = error.response?.data as ApiResponse | undefined;
        return Promise.reject(apiError || { success: false, error: { code: 'UNKNOWN', message: 'Unknown error occurred' } });
      }
    );
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  // Auth endpoints
  async login(credentials: LoginDTO): Promise<ApiResponse<LoginResponseDTO>> {
    return this.client.post('/auth/login', credentials);
  }

  async registerClient(data: Record<string, unknown>): Promise<ApiResponse<User>> {
    return this.client.post('/auth/register-client', data);
  }

  async getMe(): Promise<ApiResponse<User>> {
    return this.client.get('/auth/me');
  }

  // Client endpoints
  async getClients(): Promise<ApiResponse<{ clients: unknown[] }>> {
    return this.client.get('/clients');
  }

  async getClientById(clientId: string): Promise<ApiResponse<{ client: unknown }>> {
    return this.client.get(`/clients/${clientId}`);
  }

  async createClient(data: Record<string, unknown>): Promise<ApiResponse<{ client: unknown }>> {
    return this.client.post('/clients', data);
  }

  async updateClient(clientId: string, data: Record<string, unknown>): Promise<ApiResponse<{ client: unknown }>> {
    return this.client.put(`/clients/${clientId}`, data);
  }

  async deleteClient(clientId: string): Promise<ApiResponse<void>> {
    return this.client.delete(`/clients/${clientId}`);
  }

  // Vehicle endpoints
  async getVehicles(clientId?: string): Promise<ApiResponse<{ vehicles: unknown[] }>> {
    const params = clientId ? { clientId } : {};
    return this.client.get('/vehicles', { params });
  }

  async getVehicleById(vehicleId: string): Promise<ApiResponse<{ vehicle: unknown }>> {
    return this.client.get(`/vehicles/${vehicleId}`);
  }

  async createVehicle(data: Record<string, unknown>): Promise<ApiResponse<{ vehicle: unknown }>> {
    return this.client.post('/vehicles', data);
  }

  async updateVehicle(vehicleId: string, data: Record<string, unknown>): Promise<ApiResponse<{ vehicle: unknown }>> {
    return this.client.put(`/vehicles/${vehicleId}`, data);
  }

  async deleteVehicle(vehicleId: string): Promise<ApiResponse<void>> {
    return this.client.delete(`/vehicles/${vehicleId}`);
  }

  // Service Order endpoints
  async getServiceOrders(filters?: Record<string, unknown>): Promise<ApiResponse<{ orders: unknown[] }>> {
    return this.client.get('/service-orders', { params: filters });
  }

  async getServiceOrderById(orderId: string): Promise<ApiResponse<{ order: unknown }>> {
    return this.client.get(`/service-orders/${orderId}`);
  }

  async createServiceOrder(data: Record<string, unknown>): Promise<ApiResponse<{ order: unknown }>> {
    return this.client.post('/service-orders', data);
  }

  async updateServiceOrderStatus(orderId: string, status: string): Promise<ApiResponse<{ order: unknown }>> {
    return this.client.patch(`/service-orders/${orderId}/status`, { status });
  }

  async updateServiceOrderMaterials(orderId: string, materials: unknown[]): Promise<ApiResponse<{ order: unknown }>> {
    return this.client.patch(`/service-orders/${orderId}/materials`, { materials });
  }

  async updateServiceOrderCosts(orderId: string, data: Record<string, number>): Promise<ApiResponse<{ order: unknown }>> {
    return this.client.patch(`/service-orders/${orderId}/costs`, data);
  }

  async getClientServiceHistory(clientId: string): Promise<ApiResponse<{ history: unknown[] }>> {
    return this.client.get(`/service-orders/client/${clientId}/history`);
  }

  // Inventory endpoints
  async getInventory(): Promise<ApiResponse<{ items: unknown[] }>> {
    return this.client.get('/inventory');
  }

  async createInventoryItem(data: Record<string, unknown>): Promise<ApiResponse<{ item: unknown }>> {
    return this.client.post('/inventory', data);
  }

  async updateInventoryItem(itemId: string, data: Record<string, unknown>): Promise<ApiResponse<{ item: unknown }>> {
    return this.client.put(`/inventory/${itemId}`, data);
  }

  async adjustInventory(itemId: string, data: Record<string, unknown>): Promise<ApiResponse<{ item: unknown }>> {
    return this.client.patch(`/inventory/${itemId}/adjust`, data);
  }

  // Financial endpoints
  async getFinancialSummary(period?: string): Promise<ApiResponse<Record<string, unknown>>> {
    const params = period ? { period } : {};
    return this.client.get('/finance/summary', { params });
  }

  async getFinancialEntries(filters?: Record<string, unknown>): Promise<ApiResponse<{ entries: unknown[] }>> {
    return this.client.get('/finance/entries', { params: filters });
  }

  async createFinancialEntry(data: Record<string, unknown>): Promise<ApiResponse<{ entry: unknown }>> {
    return this.client.post('/finance/entries', data);
  }
}

export default new ApiService();
