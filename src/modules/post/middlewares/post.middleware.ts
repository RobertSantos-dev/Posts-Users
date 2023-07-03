import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PostMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { title, text, userId } = req.body;
    if (!title || !text || !userId) {
      throw new HttpException(
        'title, text or userId invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (typeof userId === 'string') {
      throw new HttpException('userId not is number', HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
