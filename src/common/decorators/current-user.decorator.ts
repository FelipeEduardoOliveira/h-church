import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { usuario } from '@prisma/client';

export type SafeUser = Omit<usuario, 'password'>;

export const CurrentUser = createParamDecorator(
  (
    data: keyof SafeUser | undefined,
    ctx: ExecutionContext,
  ): SafeUser | SafeUser[keyof SafeUser] | null => {
    const request = ctx.switchToHttp().getRequest();
    const user: SafeUser = request.user;

    if (data) {
      return user ? user[data] : null;
    }

    return user;
  },
);
