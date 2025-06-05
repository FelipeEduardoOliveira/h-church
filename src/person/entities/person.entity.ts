export enum TipoPessoa {
  MEMBRO = 'MEMBRO',
  VISITANTE = 'VISITANTE',
}

export class Person {
  id: string;
  nome: string;
  dataNascimento: Date;
  telefone?: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  tipo: TipoPessoa;
  congregaEmOutra: boolean;
  membroDesde?: Date;
  visitante?: string;
  membro?: string;
  createdAt: Date;
  updatedAt: Date;
}
