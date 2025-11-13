import { z } from 'zod';

export const ativoFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  estado: z.enum(['excelente', 'bom', 'regular', 'mau']),
  descricao: z.string().optional(),
  valor: z.number().optional(),
  data_aquisicao: z.string().optional(),
  localizacao: z.string().optional(),
});

export type AtivoFormData = z.infer<typeof ativoFormSchema>;
