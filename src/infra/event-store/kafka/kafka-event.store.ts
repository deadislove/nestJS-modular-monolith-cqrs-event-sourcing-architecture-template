import { Kafka, Producer } from "kafkajs";
import { IEventStore } from "../event-store.interface";

type KafkaConfig = {
    broker: string;
    clientId: string;
  };

export const EVENT_STORE = 'EVENT_STORE'

export class KafkaEventStore implements IEventStore {
    private kafka: Kafka
    private producer: Producer

    constructor(private readonly config: KafkaConfig) {
        this.kafka = new Kafka({
            clientId: config.clientId,
            brokers: [ config.broker ]
        })

        this.producer = this.kafka.producer()
    }

    async connect() {
        await this.producer.connect()
        console.log('[Kafka] Connected')
    }

    async appendEvent(streamId: string, event: any): Promise<void> {
        await this.producer.send({
            topic: streamId,
            messages: [
              {
                key: event.type,
                value: JSON.stringify(event),
              },
            ],
          })
    }
    readEvent(streamId: string): Promise<any[]> {
        /**
         * Kafka is not designed for direct querying of past events like a traditional database. 
         * Instead, it uses a streaming model, where consumers subscribe to topics and receive events in real-time.
         */
        return Promise.reject(new Error("Kafka is a write-optimized system; reading requires consumer groups."))
    }
}