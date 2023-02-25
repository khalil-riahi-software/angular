import { SharedService } from './../services/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  // --- registers shared service to gain access to behavior subject variables
  constructor(private shared: SharedService) {}
}
