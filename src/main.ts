import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function getConfig(){
  const config = new DocumentBuilder()
    .setTitle('BlogPost API')
    .setDescription('This API let create BlogPost and Comments for it')
    .setVersion('1.0')
    .build();
  return config;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = getConfig();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
