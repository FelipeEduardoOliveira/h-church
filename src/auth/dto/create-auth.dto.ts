import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'O campo e-mail está inválido' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MinLength(4, { message: 'O campo senha tem que ter no mínimo 4 caracteres' })
  senha: string;
}
