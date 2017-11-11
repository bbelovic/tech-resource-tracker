import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent} from './login.component';
import { DummyComponent } from './dummy.component';
import { TechResourceService} from './tech-resource-service';
import { AuthenticationService} from './authentication-service';

const routes: Routes = [ 
  {path: '', component: DummyComponent},
  {path: 'dummy', component: DummyComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent, LoginComponent, DummyComponent
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
