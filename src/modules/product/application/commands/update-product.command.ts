export class UpdateProductCommand {
    constructor(
        public readonly id: string,
        public readonly name:string,
        public readonly description: string | null,
        public readonly price: number,
        public readonly stock: number,
        public readonly category: string | null,
        public readonly isActive: boolean,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ){}
}