import {Component} from '@angular/core';
@Component(
    {
        selector: 'dummy',
        templateUrl: './dummy.component.html',
        styleUrls: ['./dummy.component.css']
    }
)
export class DummyComponent {
    message: string = 'Dummy';

}