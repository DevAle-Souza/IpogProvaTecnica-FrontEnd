export enum Priority {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA'
}

export enum Situation {
  ABERTA = 'ABERTA',
  PENDENTE = 'PENDENTE',
  CONCLUIDA = 'CONCLUIDA'
}

export interface Task {
  id?: string;                    // UUID gerado automaticamente
  name?: string;                  // Nome da tarefa (obrigatório, máx 100 chars)
  nome?: string;                  // Nome da tarefa (backend)
  description?: string;           // Descrição (opcional, máx 500 chars)
  descricao?: string;             // Descrição (backend)
  priority?: Priority;            // Prioridade (obrigatório)
  prioridade?: Priority;          // Prioridade (backend)
  situation?: Situation;          // Situação (obrigatório, padrão: ABERTA)
  situacao?: Situation;           // Situação (backend)
  expectedCompletionDate?: string; // Data prevista (obrigatório, formato: YYYY-MM-DD)
  dataPrevistaConclusao?: string; // Data prevista (backend)
  creationDate?: string;          // Data de criação (gerada automaticamente)
  dataCriacao?: string;          // Data de criação (backend)
  userId?: string;               // ID do usuário (definido automaticamente)
  idUser?: string;               // ID do usuário (backend)
}

export interface TaskFilter {
  name?: string;
  priority?: Priority;
  situation?: Situation;
  page?: number;
  size?: number;
  sort?: string;  // Campo para ordenação (ex: "name", "priority")
  direction?: 'ASC' | 'DESC';
}

export interface TaskPageResponse {
  content: Task[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
