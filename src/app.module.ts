import { Module } from '@nestjs/common';
import { SpeciesModule } from './species/infrastructure/nest/species.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigDatabase } from './config/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ConfigDatabase],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
    }),

    SpeciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
