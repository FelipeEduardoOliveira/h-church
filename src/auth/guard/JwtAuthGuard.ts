import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      // Mensagem personalizada em português
      throw new UnauthorizedException('Token inválido ou não informado.');
    }
    return user;
  }
}
