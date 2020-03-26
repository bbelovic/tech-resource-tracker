import { Component, OnInit } from '@angular/core';
import { RuntimeInformationService } from 'app/services/runtime-information.service';
import { RuntimeInformation } from 'app/shared/runtime-information';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  runtimeInformation = 'Runtime information';

  constructor(private runtimeService: RuntimeInformationService) { }

  ngOnInit() {
    this.runtimeService.getRuntimeInformation()
    .subscribe(runtimeInformation => this.formatRuntimeInformation(runtimeInformation))
  }

  private formatRuntimeInformation(runtimeInformation: RuntimeInformation) {
    this.runtimeInformation = runtimeInformation.vendorName + ' - ' + runtimeInformation.feature

  }
}
