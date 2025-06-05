import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TipoPessoa } from '../entities/person.entity';
import { State } from '../entities/state.entity';
import { Type } from 'class-transformer';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'O Campo nome é obrigatório' })
  @IsString({ message: 'O Campo nome precisa ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'O Campo dataNascimento é obrigatório' })
  @Type(() => Date)
  @IsDate({ message: 'O campo dataNascimento está com a data inválida' })
  dataNascimento: Date;

  @IsOptional()
  @IsString({ message: 'O campo telefone tem que ser uma string' })
  telefone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O campo email está inválido' })
  email?: string;

  @IsOptional()
  endereco?: string;

  @IsOptional()
  cidade?: string;

  @IsOptional()
  @IsEnum(State, {
    message:
      'O campo estado recebe apenas a sigla do estado, ex: PA, SP, etc..',
  })
  estado?: State;

  @IsNotEmpty({ message: 'O Campo tipo é obrigatório' })
  @IsEnum(TipoPessoa, {
    message: 'O campo tipo deve ser MEMBRO ou VISITANTE',
  })
  tipo: TipoPessoa;

  @IsNotEmpty({ message: 'O Campo congregaEmOutra é obrigatório' })
  @IsBoolean({ message: 'O campo congregaEmOutra só recebe true ou false' })
  congregaEmOutra: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'O campo membroDesde está com a data inválida' })
  membroDesde?: Date;
}
