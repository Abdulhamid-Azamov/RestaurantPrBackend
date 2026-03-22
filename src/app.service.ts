import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
export class App {

  static async main() {
    const app = await NestFactory.create(AppModule);

    const PORT = 3999

    app.useGlobalPipes(new ValidationPipe())
    
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    })

    await app.listen(PORT);
    console.log("Server running on port", PORT);

  }

}