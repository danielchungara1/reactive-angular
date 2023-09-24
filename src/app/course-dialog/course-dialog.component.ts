import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {CourseService} from "../services/course.service";
import {MessageService} from "../messages/message.service";

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
      MessageService
    ]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private courseService: CourseService,
        private messageService: MessageService
) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {
      const changes = this.form.value
      this.courseService.save(this.course.id, changes).pipe(
        tap(val => this.dialogRef.close(val)),
        catchError((err) => {
          this.messageService.showErrors('Could not save course.')
          console.log('Could not save course', err);
          return throwError(err)
        })
      ).subscribe();
    }

    close() {
        this.dialogRef.close();
    }

}
