import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "./toast.service";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgbToast],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  constructor(public toastService: ToastService) {
  }
}
