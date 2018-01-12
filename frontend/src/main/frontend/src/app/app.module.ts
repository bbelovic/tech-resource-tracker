import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { TechResourcesComponent } from './tech-resources.component';
import { TechResourceService} from './tech-resource-service';
import { AuthenticationService} from './authentication-service';
import { AddTechResourceComponent } from './add-tech-resource.component'; 

const routes: Routes = [ 
  {path: '', component: TechResourcesComponent},
  {path: 'tech-resources', component: TechResourcesComponent},
  {path: 'add-tech-resource', component: AddTechResourceComponent}
];

@NgModule({
  declarations: [
    AppComponent, TechResourcesComponent, AddTechResourceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [TechResourceService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
