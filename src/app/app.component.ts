import {Component, OnInit} from '@angular/core';
import {LoadingService} from "./loading/loading.service";
import {MessageService} from "./messages/message.service";
import {AuthStoreService} from "./services/auth-store.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements  OnInit {

    constructor(
      protected authStore: AuthStoreService,
      private router: Router
    ) {

    }

    ngOnInit() {


    }

  logout() {
      this.authStore.logout();
      this.router.navigateByUrl('login')
  }

}
