import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../db/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('01 - findAll, caso de sucesso', async () => {
    const result = [{ id: 1, name: 'Robert', email: 'userOne@email.com' }];
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('02 - findOne, caso de sucesso', async () => {
    const result = { id: 2, name: 'Gabriel', email: 'userTwo@email.com' };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);

    const value = await service.findOne(2);
    expect(value.message).toEqual(result);
  });

  it('03 - findOne, caso de problema', async () => {
    const result = { type: 400, message: 'User not found' };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(undefined);

    expect(await service.findOne(2)).toEqual(result);
  });
});
