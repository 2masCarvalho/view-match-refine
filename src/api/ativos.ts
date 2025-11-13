export interface Notificacao {
  id: number;
  tipo: 'info' | 'aviso' | 'urgente';
  titulo: string;
  mensagem: string;
  data: string;
  data_criacao: string;
  lida: boolean;
}

export interface Manutencao {
  id: number;
  data: string;
  descricao: string;
  custo?: number;
  responsavel?: string;
}

export interface Documento {
  id: number;
  nome: string;
  tipo: string;
  url: string;
  data_upload: string;
}

export interface Foto {
  id: number;
  url: string;
  data_upload: string;
}

export interface Ativo {
  id: number;
  condominio_id: number;
  nome: string;
  tipo: string;
  estado: 'excelente' | 'bom' | 'regular' | 'mau';
  descricao?: string;
  valor?: number;
  data_aquisicao?: string;
  data_proxima_manutencao?: string;
  localizacao?: string;
  observacoes?: string;
  criado_em?: string;
  notificacoes?: Notificacao[];
  manutencoes?: Manutencao[];
  documentos?: Documento[];
  fotos?: string[];
  created_at?: string;
}

export interface CreateAtivoData {
  condominio_id: number;
  nome: string;
  tipo: string;
  estado: 'excelente' | 'bom' | 'regular' | 'mau';
  descricao?: string;
  valor?: number;
  data_aquisicao?: string;
  localizacao?: string;
}

// Mock data
let mockAtivos: Ativo[] = [
  {
    id: 1,
    condominio_id: 1,
    nome: "Elevador Principal",
    tipo: "Elevador",
    estado: "bom",
    descricao: "Elevador principal do edifício",
    valor: 25000,
    data_aquisicao: "2020-01-15",
    data_proxima_manutencao: "2025-02-01",
    localizacao: "Hall de entrada",
    observacoes: "Última revisão realizada em Janeiro de 2024",
    criado_em: new Date().toISOString(),
    notificacoes: [
      {
        id: 1,
        tipo: 'info',
        titulo: 'Manutenção programada',
        mensagem: 'Manutenção preventiva agendada para próxima semana',
        data: new Date().toISOString(),
        data_criacao: new Date().toISOString(),
        lida: false,
      },
    ],
    manutencoes: [
      {
        id: 1,
        data: '2024-01-15',
        descricao: 'Revisão anual',
        custo: 350,
        responsavel: 'TechElevadores Lda',
      },
    ],
    documentos: [],
    fotos: [],
    created_at: new Date().toISOString(),
  },
];

let nextId = 2;

// Mock API functions
export const ativosApi = {
  getByCondominio: async (condominioId: number): Promise<Ativo[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockAtivos.filter((a) => a.condominio_id === condominioId);
  },

  getById: async (id: number): Promise<Ativo | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockAtivos.find((a) => a.id === id) || null;
  },

  create: async (data: CreateAtivoData): Promise<Ativo> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newAtivo: Ativo = {
      ...data,
      id: nextId++,
      notificacoes: [],
      manutencoes: [],
      documentos: [],
      fotos: [],
      created_at: new Date().toISOString(),
    };
    mockAtivos.push(newAtivo);
    return newAtivo;
  },

  update: async (id: number, data: Partial<CreateAtivoData>): Promise<Ativo> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockAtivos.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Ativo não encontrado");
    
    mockAtivos[index] = { ...mockAtivos[index], ...data };
    return mockAtivos[index];
  },

  delete: async (id: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    mockAtivos = mockAtivos.filter((a) => a.id !== id);
  },
};
