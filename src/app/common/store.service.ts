import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Course} from "../model/course";
import {createHttpObservable} from "./util";
import {map, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";


@Injectable({
    providedIn: 'root'
})
export class Store {

    private subject = new BehaviorSubject<Course[]>([])

    courses$: Observable<Course[]> = this.subject.asObservable()

    init() {
        const http$ = createHttpObservable('/api/courses')

        const courses$: Observable<Course[]> = http$
            .pipe(
                // catchError(err => {
                //     console.log('Error occured', err)
                //     return throwError(err)
                // }),
                // finalize(() => {
                //     console.log('Finalize executed')
                // }),
                tap(() => 'HTTP request executed'),
                map(response => Object.values(response["payload"]))
                // shareReplay<Course[]>(),
                // retryWhen(errors => errors.pipe(
                //     delayWhen(() => timer(2000))
                // ))
            )

        courses$
            .subscribe(
                courses => this.subject.next(courses)
            )
    }

    selectCourseById(id: number) {
        return this.courses$.pipe(
            map(courses => courses
                .find(course => course.id == id))
        );
    }

    selectBeginnerCourses() {
        return this.filterCoursesByCategory('BEGINNER')
    }

    selectAdvancedCourses() {
        return this.filterCoursesByCategory('ADVANCED')
    }

    filterCoursesByCategory(category: string) {
        return this.courses$.pipe(
            map(courses => courses
                .filter(course => course.category == category))
        )
    }

    saveCourse(courseId: number, changes) {
        const courses = this.subject.getValue()
        const courseIndex = courses
            .findIndex(course => course.id == courseId)
        const newCourses = courses.slice()

        newCourses[courseIndex] = {
            ...courses[courseIndex],
            ...changes
        }
        this.subject.next(newCourses)

        return fromPromise(fetch(`api/courses/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'Content-Type': 'application/json'
            }
        }))
    }
}
