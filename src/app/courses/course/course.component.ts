import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesHttpService } from '../services/courses-http.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  standalone: false,
})
export class CourseComponent implements OnInit {
  course$!: Observable<Course>;

  loading$!: Observable<boolean>;

  lessons$!: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this.coursesService.findCourseByUrl(courseUrl as string);

    this.lessons$ = this.course$.pipe(
      concatMap((course) => this.coursesService.findLessons(course.id)),
      tap(console.log)
    );
  }

  loadLessonsPage(course: Course) {}
}
