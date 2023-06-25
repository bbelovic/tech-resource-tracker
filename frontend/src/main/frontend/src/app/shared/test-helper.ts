import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { TagDTO } from "app/tag-dto";
import { TechResourceDetailsDTO } from "app/tech-resource-details-dto";
import { TechResourceService } from "app/tech-resource-service";
import { of } from "rxjs";

export function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
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
    } as Partial<TechResourceService>
