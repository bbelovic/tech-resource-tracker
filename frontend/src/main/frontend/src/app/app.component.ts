import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {TechResource} from './tech-resource';
import {TechResourceService} from './tech-resource-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome to technology resource tracker';
  resources: TechResource[];

  constructor(private resourceService: TechResourceService) {}

  ngOnInit(): void {
    this.resourceService.getTechResource().then(result => this.resources = result);
  }

  createNewTechResource(title: string, link: string): void {
    this.resourceService.postNewTechResource(new TechResource(0, title, link))
      .then(resource => this.resources.push(resource));
  }
  
}
