import {BehaviorSubject, Observable, of} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

/**
 * @author Attila Barna
 */
@Injectable()
export class LoadingService {
  private loadSubject = new BehaviorSubject(false);
  loading: Observable<boolean> = this.loadSubject.asObservable();

  displayLoader<T>(obs: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.startLoad()),
        concatMap( () => obs ),
        finalize(() => this.endLoad())
      );
  }

  startLoad(): void {
    this.loadSubject.next(true);
  }

  endLoad(): void {
    this.loadSubject.next(false);
  }
}
