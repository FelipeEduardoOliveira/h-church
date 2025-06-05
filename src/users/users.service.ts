import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/bcrypt';
import { User } from './entities/user.entity';

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

  async findAll() {
    const users = await this.prisma.usuario.findMany();

    if (!users || users.length <= 0) {
      throw new NotFoundException('Nenhum usuário encontrado');
    }

    return {
      message: 'Usuários listados com sucesso',
      data: await this.responseWithPassword(users),
    };
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

  private async responseWithPassword(
    dto: User[],
  ): Promise<Omit<User, 'senha'>[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return dto.map(({ senha, ...resto }) => resto);
  }
}
