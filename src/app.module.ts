import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/JwtStrategy';
import { PersonModule } from './person/person.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, PersonModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
