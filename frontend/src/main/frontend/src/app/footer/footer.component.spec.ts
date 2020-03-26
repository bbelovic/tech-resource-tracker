import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { RuntimeInformationService } from 'app/services/runtime-information.service';
import { RuntimeInformationServiceStub } from 'app/shared/runtime-information-service-stub';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      providers: [{provide: RuntimeInformationService, useValue: new RuntimeInformationServiceStub()}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain runtime information', () => {
    const componentEl: HTMLElement = fixture.nativeElement
    component.ngOnInit();
    expect(componentEl.textContent).toContain(component.runtimeInformation);
  });
});
