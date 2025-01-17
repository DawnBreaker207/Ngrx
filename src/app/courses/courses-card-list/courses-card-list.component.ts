import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import {Course} from '../model/course';
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {CourseEntityService} from "../services/course-entity.service";

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  standalone: false,
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[] | null = [];

  @Output()
  courseChanged = new EventEmitter();

  constructor(private dialog: MatDialog, private courseService: CourseEntityService) {
  }

  ngOnInit() {
  }

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update',
    };

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {
    this.courseService.delete(course).subscribe({
      next: () => console.log("Delete completed"),
      error: (err) =>
        console.log("Deleted failed", err)
    })

  }
}
