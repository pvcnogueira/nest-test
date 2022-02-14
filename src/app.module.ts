import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from 'src/service/user.service';
import { UsersController } from './controller/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './controller/auth/auth.module';
import { BoxModule } from './controller/boxes/boxes.module';
import { UserModule } from './controller/users/userModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'Root@2022',
      database: 'nest-test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TerminusModule,
    HttpModule,
    AuthModule,
    BoxModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
