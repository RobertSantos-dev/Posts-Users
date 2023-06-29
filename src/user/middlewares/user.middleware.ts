import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { email, name } = req.body;
    if (!email || !name) {
      throw new HttpException('email or name invalid', HttpStatus.BAD_REQUEST);
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new HttpException('email invalid', HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
