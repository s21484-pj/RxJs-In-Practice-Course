import {Component, OnInit} from '@angular/core';
import {asyncScheduler, concat, of, scheduled} from "rxjs";
import {concatAll} from "rxjs/operators";

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        const source1$ = of(1, 2, 3)

        const source2$ = of(4, 5, 6)

        const source3$ = of(7, 8, 9)

        //deprecated
        const result$ = concat(source1$, source2$, source3$)

        const test$ = scheduled([source1$, source2$, source3$], asyncScheduler)
            .pipe(
                concatAll()
            )

        result$.subscribe(value => console.log(value))
    }

}
