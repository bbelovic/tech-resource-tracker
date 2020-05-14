import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication-service';
import { FooterComponent } from './footer/footer.component';
import { RuntimeInformationService } from './services/runtime-information.service';
import { RuntimeInformationServiceStub } from './shared/runtime-information-service-stub';
import { AuthenticationServiceStub } from './shared/authentication-service-stub';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [
        AppComponent, FooterComponent
      ],
      providers: [{provide: AuthenticationService, useValue: new AuthenticationServiceStub()},
        {provide: RuntimeInformationService, useValue: new RuntimeInformationServiceStub()}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as brand property 'Tech resource tracker'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.brand).toEqual('Tech resource tracker');
  }));

  it('should render brand link in a a tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('Tech resource tracker');
  }));

  it('should contain registration link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const hyperlinks = fixture.debugElement.queryAll(By.css('a'))
    const result = hyperlinks.find(el => el.nativeElement.innerText === 'Register')
    expect(result).toBeTruthy()
  });
});
