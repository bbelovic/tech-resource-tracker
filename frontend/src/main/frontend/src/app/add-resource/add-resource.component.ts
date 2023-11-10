import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechResource } from 'app/tech-resource';
import { TechResourceService } from 'app/tech-resource-service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  editedResource: TechResource;

  constructor(private techResourceService: TechResourceService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.editedResource = await this.techResourceService.getTechResourceById(id)

    console.log(`!!! got resource with title: ${this.editedResource.title}`)
            //.then(res => this.editedResource = res);
  }

}
