import { compareSync } from 'bcrypt-nodejs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class AuthService {
  user: UserEntity;

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneWithPassword(email);

    if (!user) return null;

    if (compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    this.user = user;

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
