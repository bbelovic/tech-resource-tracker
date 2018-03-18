import { TagDTO } from './tag-dto'; 
export class TechResourceDetailsDTO {
    id: number;
    title: string;
    link: string;
    tagDTOs: Array<TagDTO>;
    constructor(id: number, title: string, link: string, tagDTOs: Array<TagDTO>) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.tagDTOs = tagDTOs;
    }
}