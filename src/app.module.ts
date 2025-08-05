import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BlogPostModule,
    CommentModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'postgres'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'bloggin_user'),
        password: configService.get('DB_PASSWORD', 'bloggin_password'),
        database: configService.get('DB_NAME', 'bloggin_db'),
        autoLoadEntities: true,
        retryAttempts: 10,
        retryDelay: 3000,
        synchronize: configService.get('ENVIRONMENT_NAME') !== 'production', // Should be false in production
        logging: configService.get('ENVIRONMENT_NAME') !== 'production',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
