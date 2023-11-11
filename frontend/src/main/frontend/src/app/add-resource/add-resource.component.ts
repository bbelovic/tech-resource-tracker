import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechResource } from 'app/tech-resource';
import { TechResourceService } from 'app/tech-resource-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  editedResource: Observable<Object>;

  constructor(private techResourceService: TechResourceService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.editedResource = this.techResourceService.getTechResourceById2(id);
  }

}
