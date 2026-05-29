import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/shared/database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { generateAccountNumber } from '@/shared/utils/generate-account-number';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,

        account: {
          create: {
            accountNumber: generateAccountNumber(),
          },
        },
      },

      include: {
        account: true,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,

      account: {
        accountNumber: user.account?.accountNumber,
        balance: user.account?.balance,
      },

      createdAt: user.createdAt,
    };
  }
}
