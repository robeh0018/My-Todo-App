import {Component} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "./toast.service";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToast, NgClass, NgForOf],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  constructor(public toastService: ToastService) {
  }
}
