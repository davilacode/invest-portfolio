import { api } from './api';

const API_BASE_URL = '/portfolios/';

export interface Dashboard {
  total_assets_value: number;
  total_portfolios: number;
  assets_performance: number;
  portfolios: Portfolio[];
}

export interface Portfolio {
  id: string;
  name: string;
  base_currency: string;
  created_at: string;
  assets: Asset[];
}

export interface Asset {
  symbol: string;
  quantity: number;
  value: number;
  average_price: number;
}

export interface MarketQuote {
  symbol: string;
  name: string;
  price: number;
  period: string;
  history: number[];
}

// Obtener valores del mercado segun simbolo
export async function getMarketQuote(data: { symbol: string, period: string }): Promise<MarketQuote> {
  const query = `symbol=${encodeURIComponent(data.symbol)}&period=${encodeURIComponent(data.period)}`;
  const response = await api.get<MarketQuote>(`/market/quote/?${query}`);
  return response;
}

// Obtener información del dashboard
export async function getDashboardInfo(): Promise<Dashboard> {
  const response = await api.get<Dashboard>(API_BASE_URL + 'dashboard/');
  return response;
}

// Obtener todos los portfolios
export async function getPortfolios(): Promise<Portfolio[]> {
  const response = await api.get<Portfolio[]>(API_BASE_URL);
  return response;
}

// Obtener un portfolio por ID
export async function getPortfolioById(id: string): Promise<Portfolio> {
  const response = await api.get<Portfolio>(`${API_BASE_URL}${id}`);
  return response;
}

// Crear un nuevo portfolio
export async function createPortfolio(portfolio: Omit<Portfolio, 'id' | 'assets' | 'created_at'>): Promise<Portfolio> {
  const response = await api.post<Portfolio>(API_BASE_URL, portfolio);
  return response;
}

// Actualizar un portfolio existente
export async function updatePortfolio(id: string, portfolio: Partial<Portfolio>): Promise<Portfolio> {
  const response = await api.put<Portfolio>(`${API_BASE_URL}${id}`, portfolio);
  return response;
}

// Eliminar un portfolio
export async function deletePortfolio(id: string): Promise<void> {
  await api.delete(`${API_BASE_URL}${id}`);
}

// Agregar asset a portfolio
export async function addAsset(id: string, data: { symbol: string; quantity: number; average_price: number | undefined }): Promise<void> {
  await api.post(`${API_BASE_URL}${id}/assets/`, data);
}