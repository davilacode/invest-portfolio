import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  type Portfolio,
  getDashboardInfo,
  type Dashboard,
  getMarketQuote,
  type MarketQuote,
  addAsset,
} from '../services/portfolio';

// Traer información de simbolos
export function useMarketQuote(data: { symbol: string, period: string }) {
  return useQuery<MarketQuote>({
    queryKey: ['marketQuote', data],
    queryFn: () => getMarketQuote(data),
    enabled: data.symbol !== '',
  });
}

// Obtener información del dashboard
export function useDashboard() {
  return useQuery<Dashboard>({
    queryKey: ['dashboard'],
    queryFn: getDashboardInfo,
  });
}
// Obtener todos los portfolios
export function usePortfolios() {
  return useQuery<Portfolio[]>({
    queryKey: ['portfolios'],
    queryFn: getPortfolios,
  });
}

// Obtener un portfolio por ID
export function usePortfolio(id: string) {
return useQuery<Portfolio>({
  queryKey: ['portfolios', id],
  queryFn: () => getPortfolioById(id),
  enabled: !!id,
});
}

// Crear un nuevo portfolio
export function useCreatePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (portfolio: Omit<Portfolio, 'id' | 'assets' | 'created_at'>) => createPortfolio(portfolio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
});
}

// Actualizar un portfolio existente
export function useUpdatePortfolio() {
const queryClient = useQueryClient();
return useMutation({
  mutationFn: ({ id, portfolio }: { id: string; portfolio: Partial<Portfolio> }) =>
    updatePortfolio(id, portfolio),
  onSuccess: (_data, variables) => {
    queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    queryClient.invalidateQueries({ queryKey: ['portfolios', variables.id] });
  },
});
}

// Eliminar un portfolio
export function useDeletePortfolio() {
const queryClient = useQueryClient();
return useMutation({
  mutationFn: (id: string) => deletePortfolio(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['portfolios'] });
  },
});
}

export function useAddAssets(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { symbol: string; quantity: number; average_price: number | undefined }) => addAsset(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['portfolios', id] });
    },
  });
}