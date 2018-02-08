export class Tag {

    constructor(private id: number, private name: string) {}

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}