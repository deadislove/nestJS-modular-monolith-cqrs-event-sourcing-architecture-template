export interface IEventStore {
    appendEvent(streamId: string, event: any): Promise<void>
    readEvent(streamId: string): Promise<any[]>
}