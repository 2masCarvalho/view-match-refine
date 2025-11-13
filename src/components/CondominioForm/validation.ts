import { z } from 'zod';

export const condominioFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  morada: z.string().min(1, 'Morada é obrigatória').max(200),
  n_fracoes: z.number().min(1, 'Número de frações deve ser pelo menos 1'),
  contacto_administrador: z.string().optional(),
});

export type CondominioFormData = z.infer<typeof condominioFormSchema>;
