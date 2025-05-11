export class GetProductWithUserQuery {
    constructor(
        public readonly name: string,
        public readonly userId: number = 0
    ) {}
}