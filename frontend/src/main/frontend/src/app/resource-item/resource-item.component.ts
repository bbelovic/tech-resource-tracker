import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';

@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ResourceItemComponent implements OnInit {

  @Input()
  dto: TechResourceDetailsDTO;
  constructor() { }

  ngOnInit(): void {
  }

}
