import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {Course, sortCoursesBySeqNo} from "../model/course";
import {catchError, map, shareReplay, tap} from "rxjs/operators";
import {ResponseService} from "../model/response-service";
import {MessageService} from "../messages/message.service";

@Injectable({
  providedIn: 'root'
})
export class CourseStoreService {

  private coursesSub: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.coursesSub.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.loadAllCourses();
  }

  filterByCategory(cateogry: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses
        .filter(course => course.category === cateogry)
        .sort(sortCoursesBySeqNo)
      )
    )
  }

  private loadAllCourses(){
    this.http.get('/api/courses').pipe(
      map((res: ResponseService) => res.payload),
      catchError(err => {
        const message = "Could not load courses";
        this.messageService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((courses) => this.coursesSub.next(courses)),
      shareReplay()
    ).subscribe();
  }

  save(courseId: string, changes: Partial<Course>): Observable<any> {
    let courses = this.coursesSub.getValue();
    let newCourseIndex = courses.findIndex(course => course.id === courseId);
    courses[newCourseIndex] = {
      ... courses[newCourseIndex],
      ... changes
    }
    this.coursesSub.next(courses)
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      catchError((err) => {
        this.messageService.showErrors('Could not save course.')
        console.log('Could not save course', err);
        return throwError(err)
      }),
      shareReplay()
    );
  }

}
