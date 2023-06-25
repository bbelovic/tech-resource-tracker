import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from 'app/services/auth.service';
import { fakeTechResourceService, findComponent, findEl, testResourceDetailsDTO, testResourceTagDTO } from 'app/shared/test-helper';
import { BehaviorSubject } from 'rxjs';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { AddResourceComponent } from 'app/add-resource/add-resource.component';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from 'app/header/header.component';
import { TechResourceService } from 'app/tech-resource-service';
import { ResourceListComponent } from 'app/resource-list/resource-list.component';
import { ResourceItemComponent } from 'app/resource-item/resource-item.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authState$: BehaviorSubject<boolean>;
  let authService: jasmine.SpyObj<AuthService>;
  let location: Location;

  beforeEach(async () => {
    authState$ = new BehaviorSubject<boolean>(true);
    authService = jasmine.createSpyObj<AuthService>('AuthService', {handleLogin: authState$.toPromise()}, {$authenticationState: authState$});

    const routes: Routes = [
      {path: 'add-tech-resource', component: AddResourceComponent},
      {path: '', component: ResourceListComponent}
    ];
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ MainComponent, AddResourceComponent, HeaderComponent, ResourceListComponent, ResourceItemComponent ],

        schemas: [NO_ERRORS_SCHEMA],
        providers: [{provide: AuthService, useValue: authService}, {provide: TechResourceService, useValue: fakeTechResourceService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('header and resource list is present when user is authenticated', fakeAsync(() => {
    headerPresent(component, fixture);
    initNavigation();
    advance();
    resourceListLoaded();
    loginScreenNotVisible(fixture, authService);
  }));

  it('can navigate to add new tech resource form', fakeAsync(() => {
    initNavigation();
    advance();
    resourceListLoaded();
    clickAddResource();
    advance();
    addResourceFormPresent();
  }));

  function advance() {
    tick();
    fixture.detectChanges();
  }

  function resourceListLoaded() {
    const resourceList = fixture.debugElement.queryAll(By.css('.resource-list'));
    expect(resourceList.length).toBe(1);
    const items = fixture.debugElement.queryAll(By.css('.resource-item'));
    expect(items.length).toBe(1);
    const titleEl = findEl(fixture, 'resource-title')
    expect(titleEl.nativeElement.textContent).toEqual(testResourceDetailsDTO.title);
    const tagEl = findEl(fixture, 'resource-tag');
    expect(tagEl.nativeElement.textContent).toEqual(testResourceTagDTO.name);
  }
  
  function clickAddResource() {
    const headerComponent = findComponent(fixture, 'app-header');
    const addResourceLink = headerComponent.query(By.css(`[data-testid="add-tech-resource"]`));
    expect(addResourceLink).toBeTruthy();
    fixture.ngZone.run(() => addResourceLink.triggerEventHandler('click', { button: 0 }));
  }

  function addResourceFormPresent() {
    expect(location.path()).toBe('/add-tech-resource');  
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
    const label = fixture.debugElement.query(By.css('label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent).toEqual('Title:');
  }

  function initNavigation() {
    const router = TestBed.inject(Router);
    fixture.ngZone.run(() => router.initialNavigation());
  }
});

describe('MainComponent negative', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authState$: BehaviorSubject<boolean>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authState$ = new BehaviorSubject<boolean>(false);
    authService = jasmine.createSpyObj<AuthService>('AuthService', {handleLogin: authState$.toPromise()}, {$authenticationState: authState$});
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{provide: AuthService, useValue: authService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('header and resource list is not present when user is not authenticated', () => {
    expect(component.authenticated.value).toBeFalse();
    const resourceListComponent = findComponent(fixture, 'app-resource-list');
    expect(resourceListComponent).toBe(null);
    const headerComponent = findComponent(fixture, 'app-header');
    expect(headerComponent).toBe(null);
    const loginComponent = findComponent(fixture, 'app-login');
    expect(loginComponent).toBeTruthy();
    expect(authService.handleLogin).toHaveBeenCalledTimes(1);
  });
});

function loginScreenNotVisible(fixture: ComponentFixture<MainComponent>, authService: jasmine.SpyObj<AuthService>) {
  const loginComponent = findComponent(fixture, 'app-login');
  expect(loginComponent).toBe(null);
  expect(authService.handleLogin).toHaveBeenCalledTimes(1);
}

function headerPresent(component: MainComponent, fixture: ComponentFixture<MainComponent>) {
  expect(component.authenticated.value).toBeTrue();
  const headerComponent = findComponent(fixture, 'app-header');
  expect(headerComponent).toBeTruthy();
}
