import { toast } from 'sonner';

export class ToastService {
  static toast = toast;

  static setToast(toastFn: typeof toast) {
    this.toast = toastFn;
  }
}
