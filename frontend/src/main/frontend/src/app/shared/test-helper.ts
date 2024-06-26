import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { DateTimeService } from "app/services/date-time.service";
import { TagDTO } from "app/tag-dto";
import { TechResource } from "app/tech-resource";
import { TechResourceDetailsDTO } from "app/tech-resource-details-dto";
import { TechResourceService } from "app/tech-resource-service";
import { TechResourceStatus } from "app/tech-resource-status";
import { TechResourceType } from "app/tech-resource-type";
import { of } from "rxjs";

export function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

export function setElementValue(element: HTMLInputElement | HTMLSelectElement, value: string) {
    element.value = value;
    const isSelect = element instanceof HTMLSelectElement;
    const event = isSelect ? new Event('change') : new InputEvent('input');
    element.dispatchEvent(event);
}

export function findComponent<T>(
    fixture: ComponentFixture<T>,
    selector: string,
  ): DebugElement {
    return fixture.debugElement.query(By.css(selector));
  }

export const testResourceTagDTO = new TagDTO(2, 'java');
export const testResourceDetailsDTO = new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', [testResourceTagDTO]);

export const fixedDateTimeService = {
  createdOn(): string {
    return '2222-01-01T10:00:00';
  }
} as Partial<DateTimeService>;

export const fakeTechResourceService = {
      getTechResourceById2(id: number) {return of(new TechResource(id, 'some title', 'some link', '', TechResourceStatus.New, TechResourceType.ARTICLE))},
      getTechResourceDetailsDTO2() {return of([testResourceDetailsDTO])},
      postNewTechResource2(resource: TechResource) {return of(resource)}
    } as Partial<TechResourceService>
