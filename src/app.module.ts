import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './db/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { NewsModule } from './news/news.module';
import { GalleryModule } from './galery/galery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configservic: ConfigService) => typeOrmConfig(configservic),
    }),
    AuthModule,
    CategoryModule,
    MenuModule,
    NewsModule,
    GalleryModule
  ],
})
export class AppModule { }
