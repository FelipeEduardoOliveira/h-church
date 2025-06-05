import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  SECRETARIO = 'SECRETARIO',
  PASTOR = 'PASTOR',
  MEMBRO = 'MEMBRO',
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @MinLength(3, { message: 'O campo nome tem que ter no mínimo 3 caracteres' })
  nome: string;

  @IsEmail({}, { message: 'O campo e-mail está inválido' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MinLength(4, { message: 'O campo senha tem que ter no mínimo 4 caracteres' })
  senha: string;

  @IsNotEmpty({ message: 'O campo role é obrigatório' })
  @IsEnum(Role, {
    message: 'O campo role deve ser ADMIN, SECRETARIO, PASTOR, MEMBRO',
  })
  role: Role;
}
