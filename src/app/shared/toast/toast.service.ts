import {Injectable} from "@angular/core";

export interface ToastInfo {
  body: string;
  delay?: number;
  customClass?: string;
}

@Injectable({providedIn: 'root'})
export class ToastService {
  toasts: ToastInfo[] = [];

  show(body: string, config: { delay?: number, customClass?: string }) {

    this.toasts.push({
      body,
      delay: config.delay,
      customClass: config.customClass
    });
  };

  remove(toast: ToastInfo) {

    this.toasts = this.toasts.filter(t => t != toast);
  };
}
