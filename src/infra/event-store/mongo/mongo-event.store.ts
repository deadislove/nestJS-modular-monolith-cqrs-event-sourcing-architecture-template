import { Injectable, OnModuleInit } from "@nestjs/common"
import { IEventStore } from "../event-store.interface"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

export type StoredEvent = {
    aggregateId: string
    type: string
    payload: any
    timestamp: Date
}

@Injectable()
export class MongoEventStore implements IEventStore {

    constructor(
        @InjectModel('Event') private readonly eventModel: Model<StoredEvent>
    ) {}

    async appendEvent(streamId: string, event: StoredEvent): Promise<void> {
        await this.eventModel.create({
            aggregateId: streamId,
            type: event.type,
            payload: event.payload,
            timestamp: new Date(),
        })
    }

    async readEvent(streamId: string): Promise<StoredEvent[]> {
        const docs = await this.eventModel
      .find({ aggregateId: streamId })
      .sort({ timestamp: 1 })
      .lean()
      .exec()

      return docs.map(doc => ({
        aggregateId: doc.aggregateId,
        type: doc.type,
        payload: doc.payload,
        timestamp: doc.timestamp,
      }))
    }
}