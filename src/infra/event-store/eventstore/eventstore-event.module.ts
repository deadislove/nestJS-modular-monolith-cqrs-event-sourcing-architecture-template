import { DynamicModule, Global, Module } from "@nestjs/common";
import { EVENT_STORE, EVENT_STORE_CLIENT, EventStoreDbEventStore } from "./eventstore-event.store";
import { ConfigService } from "@nestjs/config";
import { EventStoreDBClient } from "@eventstore/db-client";

@Global()
@Module({})
export class EventStoreDbStoreModule {
    static register(): DynamicModule {
        return {
            module: EventStoreDbStoreModule,
            providers: [
                {
                    provide: EVENT_STORE_CLIENT,
                    useFactory: (configService: ConfigService) => {
                        const connectString:string = configService.get<string>('EVENTSTOREDB_URL') ?? 'esdb://localhost:2113?tls=false'
                        return EventStoreDBClient.connectionString`${connectString}`
                    },
                    inject: [
                        ConfigService
                    ]
                },
                {
                    provide: EVENT_STORE,
                    useClass: EventStoreDbEventStore
                }
            ],
            exports: [
                EVENT_STORE,
            ]
        }
    }
}