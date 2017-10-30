import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
//import { LoginComponent} from './login.component';
import { TechResourceService} from './tech-resource-service';

const routes: Routes = [{path: '', component: AppComponent}, {path: '**', component: AppComponent}];
//const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [TechResourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
