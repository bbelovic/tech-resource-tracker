import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { RuntimeInformationService } from 'app/services/runtime-information.service';
import { runtimeInformationObservable } from 'app/shared/runtime-information';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let runtimeInformationService: jasmine.SpyObj<RuntimeInformationService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('RuntimeInformationService', ['getRuntimeInformation'])
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      providers: [{provide: RuntimeInformationService, useValue: spy}]
    })
    .compileComponents();
    runtimeInformationService = TestBed.inject(RuntimeInformationService) as jasmine.SpyObj<RuntimeInformationService>;
    runtimeInformationService.getRuntimeInformation.and.returnValue(runtimeInformationObservable());
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
