import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DB: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost/pie',
  synchronize: true,
  useUnifiedTopology: true,
};
