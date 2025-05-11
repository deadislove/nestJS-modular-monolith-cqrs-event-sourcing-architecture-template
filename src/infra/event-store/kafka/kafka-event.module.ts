import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EVENT_STORE, KafkaEventStore } from "./kafka-event.store";

@Global()
@Module({})
export class KafkaEventStoreModule {
    static register(): DynamicModule {
        return {
            module: KafkaEventStoreModule,
            imports: [
                ConfigModule
            ],
            providers: [
                {
                    provide: EVENT_STORE,
                    useFactory: async (configService: ConfigService) => {
                      const broker = configService.get<string>('KAFKA_BROKER', 'localhost:9092')
                      const clientId = configService.get<string>('KAFKA_CLIENT_ID', 'event-store-client')
          
                      const store = new KafkaEventStore({ broker, clientId })
                      await store.connect();
                      return store;
                    },
                    inject: [ConfigService],
                  },
            ],
            exports: [
                EVENT_STORE
            ]
        }
    }
}