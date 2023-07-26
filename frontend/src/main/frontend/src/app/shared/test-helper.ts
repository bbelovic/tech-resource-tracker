import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
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

export const fakeTechResourceService = {     
      getTechResourceDetailsDTO2() {return of([testResourceDetailsDTO])},
      postNewTechResource(resource: TechResource) {return of(new TechResource(0, resource.title, resource.link, '', TechResourceStatus.New, TechResourceType.Article)).toPromise()}
    } as Partial<TechResourceService>
