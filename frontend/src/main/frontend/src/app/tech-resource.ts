import { TechResourceStatus } from "./tech-resource-status";
import { TechResourceType } from "./tech-resource-type";
import { Tag } from "./tag";

export class TechResource {
    id: number;
    title: string;
    link: string;
    createdOn: string;
    status: TechResourceStatus;
    type: TechResourceType;
    tags: Array<Tag>;
    constructor(id: number, title: string, link: string, 
        createdOn: string, status: TechResourceStatus, type: TechResourceType) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.createdOn = createdOn;
        this.status = status;
        this.type = type;
    }
}
