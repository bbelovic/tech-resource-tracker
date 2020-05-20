import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { TechResourcesComponent } from './tech-resources.component';
import { TechResourceService} from './tech-resource-service';
import { AuthenticationService} from './authentication-service';
import { AddTechResourceComponent } from './add-tech-resource.component';
import { EditTechResourceComponent } from './edit-tech-resource.component';
import { TagService } from './tag-service';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RuntimeInformationService } from './services/runtime-information.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterUserService } from './services/register-user.service';

const routes: Routes = [
  {path: '', component: TechResourcesComponent},
  {path: 'login2', component: LoginComponent},
  {path: 'tech-resources', component: TechResourcesComponent},
  {path: 'add-tech-resource', component: AddTechResourceComponent},
  {path: 'edit-tech-resource/:id', component: EditTechResourceComponent},
  {path: 'register-new-user', component: RegisterUserComponent}
];

@NgModule({
  declarations: [
    AppComponent, TechResourcesComponent, AddTechResourceComponent,
    EditTechResourceComponent,
    LoginComponent,
    FooterComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [TechResourceService, TagService, AuthenticationService,
    RuntimeInformationService, RegisterUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
