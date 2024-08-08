import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from 'rxjs';
import {Store} from "../common/store.service";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    //REACTIVE DESIGN

    beginnerCourses$: Observable<Course[]>

    advancedCourses$: Observable<Course[]>

    constructor(private store: Store) {
    }

    ngOnInit() {
        // const courses$ = this.store.courses$

        this.beginnerCourses$ = this.store.selectBeginnerCourses()

        this.advancedCourses$ = this.store.selectAdvancedCourses()
    }

    //IMPERATIVE DESIGN

    // beginnerCourses: Course[];
    //
    // advancedCourses: Course[];
    //
    // ngOnInit() {
    //
    //   const http$ = createHttpObservable('/api/courses');
    //
    //   const courses$: Observable<Course[]> = http$
    //     .pipe(
    //       map(response => Object.values(response["payload"]))
    //     );
    //
    //   courses$.subscribe(
    //     courses => {
    //       this.beginnerCourses = courses.filter(course => course.category == "BEGINNER");
    //       this.advancedCourses = courses.filter(course => course.category == "ADVANCED");
    //     },
    //     noop,
    //     () => console.log('completed')
    //   )
    // }

}
