import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getService(): string {
    return 'Server is running';
  }
}
