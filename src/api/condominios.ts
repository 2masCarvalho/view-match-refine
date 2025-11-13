export interface Condominio {
  id: number;
  nome: string;
  morada: string;
  n_fracoes: number;
  contacto_administrador?: string;
  created_at?: string;
}

export interface CreateCondominioData {
  nome: string;
  morada: string;
  n_fracoes: number;
  contacto_administrador?: string;
}

// Mock data
let mockCondominios: Condominio[] = [
  {
    id: 1,
    nome: "Edifício Central",
    morada: "Rua Principal, 123, Lisboa",
    n_fracoes: 24,
    contacto_administrador: "+351 912 345 678",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    nome: "Residencial Mar Azul",
    morada: "Av. Atlântica, 456, Porto",
    n_fracoes: 36,
    contacto_administrador: "+351 913 456 789",
    created_at: new Date().toISOString(),
  },
];

let nextId = 3;

// Mock API functions
export const condominiosApi = {
  getAll: async (): Promise<Condominio[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...mockCondominios];
  },

  getById: async (id: number): Promise<Condominio | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCondominios.find((c) => c.id === id) || null;
  },

  create: async (data: CreateCondominioData): Promise<Condominio> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newCondominio: Condominio = {
      ...data,
      id: nextId++,
      created_at: new Date().toISOString(),
    };
    mockCondominios.push(newCondominio);
    return newCondominio;
  },

  update: async (id: number, data: Partial<CreateCondominioData>): Promise<Condominio> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockCondominios.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Condomínio não encontrado");
    
    mockCondominios[index] = { ...mockCondominios[index], ...data };
    return mockCondominios[index];
  },

  delete: async (id: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    mockCondominios = mockCondominios.filter((c) => c.id !== id);
  },
};
