import { DynamicModule } from "@nestjs/common";
import { MongoEventStoreModule } from "./mongo/mongo-event.module";
import { KafkaEventStoreModule } from "./kafka/kafka-event.module";
import { EventStoreDbStoreModule } from "./eventstore/eventstore-event.module";

export class EventStoreFactory {
    static createEventStore(provider: string): DynamicModule {
        switch (provider) {
            case 'mongo':
                return MongoEventStoreModule.register()
            case 'kafka':
                return KafkaEventStoreModule.register()
            case 'esdb':
                return EventStoreDbStoreModule.register()
            default:
                throw new Error('Unknown event store provider')
        }
    }
}