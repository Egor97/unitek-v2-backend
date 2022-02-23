import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Unitek BACKEND')
      .setDescription('Документация unitek BACKEND')
      .setVersion('1.0.0')
      .addTag('Описатель')
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port`);
  });
}

start();
