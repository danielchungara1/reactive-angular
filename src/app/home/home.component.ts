import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {CourseService} from "../services/course.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private courseService: CourseService,
  ) {
  }

  ngOnInit() {
    this.reloadList(undefined);
  }


  reloadList($event: any) {
    const courses$ = this.courseService.loadAllCourses().pipe(
      map(courses => courses.sort(sortCoursesBySeqNo)),
    );
    this.beginnerCourses$ = courses$.pipe(
      map(course => course.filter(course => course.category == "BEGINNER"))
    )
    this.advancedCourses$ = courses$.pipe(
      map(course => course.filter(course => course.category == "ADVANCED"))
    );
  }
}




