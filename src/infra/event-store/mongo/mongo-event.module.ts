import { DynamicModule, Global, Module } from "@nestjs/common";
import { MongoEventStore } from "./mongo-event.store";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventSchema } from "@infra/schemas/event.schema";

@Global()
@Module({})
export class MongoEventStoreModule {
    static register(): DynamicModule {
        return {
            module: MongoEventStoreModule,
            imports: [
                ConfigModule,
                MongooseModule.forRootAsync({
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        uri: configService.get<string>('MONGO_URL'),
                    }),
                }),
                MongooseModule.forFeature([
                    {
                        name: 'Event',
                        schema: EventSchema,
                    },
                ]),
            ],
            providers: [
                {
                    provide: 'IEventStore',
                    useClass: MongoEventStore
                },
            ],
            exports: ['IEventStore'],
        }
    }
}