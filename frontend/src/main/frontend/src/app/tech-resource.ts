export class TechResource {
    id: number;
    title: string;
    link: string;
    createdOn: string;
    constructor(id: number, title: string, link: string, createdOn: string) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.createdOn = createdOn;
    }
}
