import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserByEmailWithPassword(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return {
        id: user.id,
        email: user.email,
      };
    }
    return null;
  }

  async createUser(user: { email: string; password: string; sex: string }) {
    const existedUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (existedUser) throw new Error('User with this email exists');
    return this.userRepository.insert(user);
  }

  async createGoogleUser(email) {
    return this.userRepository.insert({ email });
  }
}

export default UserService;
