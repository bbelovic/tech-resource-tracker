import { Injectable } from "@angular/core";

@Injectable()
export class DateTimeService {
    createdOn(): string {
        const now: string = new Date().toISOString();
        return now.substring(0, now.indexOf('.'));
    };
}