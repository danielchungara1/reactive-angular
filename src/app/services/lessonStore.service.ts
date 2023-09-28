import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {Course, sortCoursesBySeqNo} from "../model/course";
import {catchError, map, shareReplay, tap} from "rxjs/operators";
import {ResponseService} from "../model/response-service";
import {MessageService} from "../messages/message.service";
import {Lesson} from "../model/lesson";

@Injectable({
  providedIn: 'root'
})
export class LessonStoreService {

  private lessonsSub: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  lessons$: Observable<Lesson[]> = this.lessonsSub.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    // this.loadAllCourses();
  }

  // filterByCategory(cateogry: string): Observable<Course[]> {
  //   return this.lessons$.pipe(
  //     map(courses => courses
  //       .filter(course => course.category === cateogry)
  //       .sort(sortCoursesBySeqNo)
  //     )
  //   )
  // }

  searchLessons(){
    this.http.get('/api/lessons').pipe(
      map((res: ResponseService) => res.payload),
      catchError(err => {
        const message = "Could not load lessons";
        this.messageService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((lessons) => this.lessonsSub.next(lessons)),
      shareReplay()
    );
  }

  // save(courseId: string, changes: Partial<Course>): Observable<any> {
  //   let courses = this.lessonsSub.getValue();
  //   let newCourseIndex = courses.findIndex(course => course.id === courseId);
  //   courses[newCourseIndex] = {
  //     ... courses[newCourseIndex],
  //     ... changes
  //   }
  //   this.lessonsSub.next(courses)
  //   return this.http.put(`/api/courses/${courseId}`, changes).pipe(
  //     catchError((err) => {
  //       this.messageService.showErrors('Could not save course.')
  //       console.log('Could not save course', err);
  //       return throwError(err)
  //     }),
  //     shareReplay()
  //   );
  // }

}
