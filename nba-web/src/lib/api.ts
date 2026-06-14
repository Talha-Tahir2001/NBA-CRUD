const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Player {
  _id: string;
  name: string;
  team: string;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  jerseyNumber: number;
  pointsPerGame: number;
  isAllStar: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlayerInput {
  name: string;
  team: string;
  position: Player['position'];
  jerseyNumber: number;
  pointsPerGame?: number;
  isAllStar?: boolean;
}


async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return res.json();
}

// Player API methods
export const playerApi = {
  getAll: () => fetcher<Player[]>('/players'),
  getOne: (id: string) => fetcher<Player>(`/players/${id}`),
  create: (data: CreatePlayerInput) =>
    fetcher<Player>('/players', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<CreatePlayerInput>) =>
    fetcher<Player>(`/players/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    fetcher<{ message: string }>(`/players/${id}`, { method: 'DELETE' }),
};