import { Injectable } from '@angular/core';
import { callbackify } from 'util';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertfiyService {

constructor() { }

confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, e => {
    if (e) {
      okCallback();
    }
  });
}

success(message: string) {
  alertify.success(message);
}

error(message: string) {
  alertify.error(message);
}

warning(message: string) {
  alertify.warning(message);
}

message(message: string) {
  alertify.message(message);
}

}
