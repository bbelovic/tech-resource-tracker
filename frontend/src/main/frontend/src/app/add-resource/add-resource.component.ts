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

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
        this.techResourceService.getTechResourceById(id)
            .then(res => this.editedResource = res);
  }

}
