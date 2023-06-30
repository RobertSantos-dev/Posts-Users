import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { PrismaService } from '../../db/prisma.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('01 - findAll, caso de sucesso', async () => {
    const result = [{ id: 1, name: 'Robert', email: 'userOne@email.com' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('02 - findOne, caso de sucesso', async () => {
    const result = { id: 2, name: 'Gabriel', email: 'userTwo@email.com' };
    jest
      .spyOn(service, 'findOne')
      .mockResolvedValue({ type: null, message: result });

    const value = await controller.findOne(2);
    expect(value).toEqual(result);
  });

  it('03 - findOne, caso de problema', () => {
    const result = { type: 400, message: 'User not found' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    controller.findOne(2).catch((error: any) => {
      expect(error).toEqual(new HttpException(result.message, result.type));
    });
  });
});
