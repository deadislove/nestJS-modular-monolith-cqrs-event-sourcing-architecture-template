import { Inject, Injectable } from "@nestjs/common";
import { IEventStore } from "../event-store.interface";
import { EventStoreDBClient, FORWARDS, jsonEvent, START } from "@eventstore/db-client";

export const EVENT_STORE: string = 'EVENT_STORE'
export const EVENT_STORE_CLIENT: string = 'EVENTSTORE_CLIENT'

@Injectable()
export class EventStoreDbEventStore implements IEventStore {

    constructor(
        @Inject(EVENT_STORE_CLIENT)
        private readonly client: EventStoreDBClient
    ) { }

    async appendEvent(streamId: string, event: any): Promise<void> {
        const newEvent = jsonEvent({
            type: event.type,
            data: event.payload,
        })

        await this.client.appendToStream(streamId, [newEvent])
    }
    async readEvent(streamId: string): Promise<any[]> {
        const events = this.client.readStream(streamId, {
            fromRevision: START,
            direction: FORWARDS,
        })

        const result: any[] = [];
        for await (const resolvedEvent of events) {
            result.push({
                id: resolvedEvent.event?.id,
                type: resolvedEvent.event?.type,
                data: resolvedEvent.event?.data,
                metadata: resolvedEvent.event?.metadata,
            })
        }

        return result
    }
}