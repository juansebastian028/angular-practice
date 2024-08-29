import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private notifySubject = new Subject<any>();
  notify$ = this.notifySubject.asObservable();

  notify(data: any) {
    this.notifySubject.next(data);
  }
}

