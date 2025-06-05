import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: LoginAuthDto) {
    const validUser = await this.validateUser(createAuthDto);

    const payload = {
      ...validUser,
      access_token: this.jwtService.sign(validUser),
    };

    return {
      data: payload,
      message: 'Usuário logado com sucesso',
    };
  }

  private async validateUser(createAuthDto: LoginAuthDto) {
    const user = await this.usersService.findUserByEmail(createAuthDto.email);

    if (!user) {
      throw new UnauthorizedException('O usuário informado não existe');
    }

    const passwordMatch = await comparePassword(
      createAuthDto.senha,
      user.senha,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Senha inválida');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...resto } = user;

    return resto;
  }
}
