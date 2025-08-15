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
} from '../services/portfolio';

// Obtener todos los portfolios
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
  mutationFn: (portfolio: Omit<Portfolio, 'id'>) => createPortfolio(portfolio),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['portfolios'] });
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