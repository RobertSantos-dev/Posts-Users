import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../../../db/prisma.service';

describe('PostService', () => {
  let service: PostService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('01 - findAll, caso de sucesso', async () => {
    const result = [
      {
        id: 10,
        title: 'Estudo atual',
        text: 'Atualmente estou estudando NestJS e Prisma',
        userId: 1,
      },
      {
        id: 11,
        title: 'Proximo passo',
        text: 'Futuramente estudar Java',
        userId: 2,
      },
    ];

    jest.spyOn(prisma.post, 'findMany').mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
  });

  it('02 - findOne, caso de sucesso', async () => {
    const result = {
      id: 11,
      title: 'Proximo passo',
      text: 'Futuramente estudar Java',
      userId: 2,
    };
    jest.spyOn(prisma.post, 'findUnique').mockResolvedValue(result);

    const { message } = await service.findOne(11);

    expect(message).toEqual(result);
  });
});
