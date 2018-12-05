import {EMPTY} from "rxjs";
import {Observable, fromEvent, Observer, timer, range, ReplaySubject, from} from "rxjs";
import {delay, map, reduce, retryWhen, scan} from 'rxjs/operators';

import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';


describe("test", () => {

    test("empty", () => {
        EMPTY.subscribe(
            (x) => logger.debug("next", x),
            (x) => logger.error("error", x),
            () => {
                logger.debug("complete")
            }
        );

    });


    test("observable", () => {
        const observable: Observable<number> = Observable.create((observer: Observer<number>) => {

            [1, 2, 4].forEach((item) => {
                observer.next(item);
            });

        });

        observable.subscribe(
            (x) => logger.log("next", x),
            (x) => logger.log("error", x),
            () => {
                logger.log("complete")
            })
    });

    it("form", () => {

        const p: ReplaySubject<any> = new ReplaySubject<any>();
        from([1, 2, 4, 5]).pipe(delay(200)).subscribe((item) => {
            p.next({
                name: "count",
                value: item
            });
            logger.log("next", item);
        });

        p.subscribe((payload: any) => {
            logger.log("payload", payload);

        });
    })
});