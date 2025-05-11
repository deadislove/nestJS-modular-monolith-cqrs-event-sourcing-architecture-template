import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from '@infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@infra/logger/logger.module';
import { EventStoreFactory } from '@infra/event-store/event-store.factory';
import { AuthModule } from '@modules/auth/auth.module';
import { ProductModule } from '@modules/product/product.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    DataBaseModule,
    EventStoreFactory.createEventStore('mongo'),
    AuthModule,
    UserModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
