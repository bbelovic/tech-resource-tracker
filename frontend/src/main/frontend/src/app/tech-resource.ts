import { TechResourceStatus } from "./tech-resource-status";

export class TechResource {
    id: number;
    title: string;
    link: string;
    createdOn: string;
    status: TechResourceStatus;
    constructor(id: number, title: string, link: string, 
        createdOn: string, status: TechResourceStatus) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.createdOn = createdOn;
        this.status = status;
    }
}
