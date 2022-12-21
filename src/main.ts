import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CCXT Documentation with Swagger')
    .setDescription(
      `A JavaScript / Python / PHP cryptocurrency trading API with support for more than 100 bitcoin/altcoin exchanges 
      \n <a target='_blank' href='https://docs.ccxt.com/en/latest/manual.html'> CCXT - Manual  </a>
      \n <a target='_blank' href='https://github.com/ccxt/ccxt'> CCXT - Github </a>`,
    )
    .setVersion('1.0')
    .addTag('marketHistory')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
