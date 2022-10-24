import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication.service';
import { FooterComponent } from './footer/footer.component';
import { RuntimeInformationService } from './services/runtime-information.service';
import { By } from '@angular/platform-browser';
import { runtimeInformationObservable } from './shared/runtime-information';

xdescribe('AppComponent', () => {
  let authService: jasmine.SpyObj<AuthenticationService>;
  let runtimeService: jasmine.SpyObj<RuntimeInformationService>;

  beforeEach(() => {

    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['isAuthenticated']);
    const runtimeServiceSpy = jasmine.createSpyObj('RuntimeInformationService', ['getRuntimeInformation']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [
        AppComponent, FooterComponent
      ],
      providers: [{provide: AuthenticationService, useValue: authServiceSpy},
        {provide: RuntimeInformationService, useValue: runtimeServiceSpy}
      ]
    }).compileComponents();
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    runtimeService = TestBed.inject(RuntimeInformationService) as jasmine.SpyObj<RuntimeInformationService>;
    authService.isAuthenticated.and.returnValue(true);
    runtimeService.getRuntimeInformation.and.returnValue(runtimeInformationObservable());
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

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
