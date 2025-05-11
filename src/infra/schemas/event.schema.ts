import { Schema } from "mongoose";

export const EventSchema = new Schema({
    aggregateId: { type: String, required: true },
    type: { type: String, required: true },
    payload: { type: Object, required: true },
    timestamp: { type: Date, default: Date.now },
})