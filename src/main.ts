import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@common/filters/http-exceptions.filter';
import { ResposneInterceptor } from '@common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResposneInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
