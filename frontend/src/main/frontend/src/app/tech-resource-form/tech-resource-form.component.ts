import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TechResource } from 'app/tech-resource';
import { TechResourceService } from 'app/tech-resource-service';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';

@Component({
  selector: 'app-tech-resource-form',
  templateUrl: './tech-resource-form.component.html',
  styleUrls: ['./tech-resource-form.component.css']
})
export class TechResourceFormComponent implements OnInit {

  techResourceForm = this.fb.group({
    title: [''],
    link: ['']
  });

  constructor(private fb: FormBuilder, private techService: TechResourceService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const title = this.techResourceForm.value['title'];
    const link = this.techResourceForm.value['link'];
    console.log('@@@ in component value=' + link)
    const techResource = new TechResource(0, title, link, '', TechResourceStatus.New, TechResourceType.Article)
    this.techService.postNewTechResource(techResource);
    
  }
}