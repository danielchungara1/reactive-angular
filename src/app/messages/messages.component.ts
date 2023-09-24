import { Component, OnInit } from '@angular/core';
import {MessageService} from "./message.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  showMessages = false;
  errors$: Observable<string[]>;

  constructor(protected  messageService: MessageService) {
  }

  ngOnInit() {
    this.errors$ = this.messageService.errors$.pipe(
        tap(() => this.showMessages = true)
      )
  }


  onClose() {
    this.showMessages=false;
  }

}
