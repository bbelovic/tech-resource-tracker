export class TechResource {
    id: number;
    title: string;
    link: string;
    createdOn: string;
    status: string
    constructor(id: number, title: string, link: string, 
        createdOn: string, status: string) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.createdOn = createdOn;
        this.status = status;
    }
}
