import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from "rxjs";
import {CourseStoreService} from "../services/courseStore.service";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private courseStoreService: CourseStoreService
  ) {
  }

  ngOnInit() {
    this.reloadList(undefined);
  }


  reloadList($event: any) {
    this.beginnerCourses$ = this.courseStoreService.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.courseStoreService.filterByCategory("ADVANCED");
  }
}




