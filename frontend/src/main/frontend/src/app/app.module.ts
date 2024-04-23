import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { TechResourcesComponent } from './tech-resources.component';
import { TechResourceService} from './tech-resource-service';
import { AuthenticationService} from './authentication.service';
import { AddTechResourceComponent } from './add-tech-resource.component';
import { TagService } from './tag-service';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RuntimeInformationService } from './services/runtime-information.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterUserService } from './services/register-user.service';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { ResourceItemComponent } from './resource-item/resource-item.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { MainComponent } from './main/main.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { DateTimeService } from './services/date-time.service';

const routes: Routes = [
  {path: '', component: ResourceListComponent},
  {path: 'add-tech-resource', component: AddResourceComponent},
  {path: 'edit-tech-resource/:id', component: AddResourceComponent},
  {path: 'register-new-user', component: RegisterUserComponent}
];

@NgModule({
  declarations: [
    AppComponent, TechResourcesComponent, AddTechResourceComponent,
    LoginComponent,
    FooterComponent,
    RegisterUserComponent,
    HeaderComponent,
    ResourceItemComponent,
    ResourceListComponent,
    MainComponent,
    AddResourceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {enableTracing: true}),
    ReactiveFormsModule
  ],
  providers: [TechResourceService, TagService, AuthService, AuthenticationService,
    RuntimeInformationService, RegisterUserService, DateTimeService],
  bootstrap: [MainComponent]
})
export class AppModule { }
