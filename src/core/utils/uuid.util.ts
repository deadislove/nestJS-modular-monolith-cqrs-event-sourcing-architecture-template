import { v4 as uuidv4 } from 'uuid'
export class UUIDUtil {
    static generate(): string {
        return uuidv4()
    }
}