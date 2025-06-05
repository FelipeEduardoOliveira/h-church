import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.findUserByEmail(createUserDto.email);

    if (findUser) {
      throw new BadRequestException('Usuário já existe');
    }

    try {
      const createUser = await this.createUser(createUserDto);
      return {
        data: createUser,
        messsage: 'Usuário criado com sucesso',
      };
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuario: ', error);
    }
  }

  async findUserByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Login não informado');
    }

    const user = await this.prisma.usuario.findUnique({ where: { email } });

    return user;
  }

  private async createUser(dto: CreateUserDto) {
    const hashedPassword = await hashPassword(dto.senha);

    const payload = {
      nome: dto.nome,
      email: dto.email,
      senha: hashedPassword,
      ativo: true,
      role: dto.role,
    };

    const data = await this.prisma.usuario.create({
      data: payload,
    });

    return data;
  }
}
