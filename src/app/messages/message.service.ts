import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {filter} from "rxjs/operators";

@Injectable()
export class MessageService {

  private errorsSub: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  errors$: Observable<string[]> = this.errorsSub.asObservable().pipe(
    filter(messages => messages && messages.length > 0)
  );

  constructor() { }

  showErrors(...errors: string[]) {
    this.errorsSub.next(errors);
  }

}
