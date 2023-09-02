import { interval, fromEvent, merge, empty } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap
// Example 2: Countdown timer with pause and resume

const COUNTDOWN_SECONDS = 10;

// elem refs
const remainingLabel = document.getElementById('remaining');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');

// streams
const interval$ = interval(1000).pipe(mapTo(-1));
const stop$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
const start$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));

const timer$ = merge(stop$, start$)
  .pipe(
    startWith(true),
    switchMap((val) => (val ? interval$ : empty())),
    scan((acc, curr) => (curr ? curr + acc : acc), COUNTDOWN_SECONDS),
    takeWhile((v) => v >= 0)
  )
  .subscribe((val: any) => (remainingLabel.innerHTML = val));
