
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string) {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminUsername || !adminPasswordHash) {
      throw new UnauthorizedException('Admin login is not configured');
    }

    const validUsername = username === adminUsername;
    const validPassword = await bcrypt.compare(
      password,
      adminPasswordHash,
    );

    if (!validUsername || !validPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: adminUsername,
      role: 'admin',
    });

    return { accessToken };
  }
}
