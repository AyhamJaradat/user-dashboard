import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private showSearchInHeader = new Subject();
  public showSearchBar$ = this.showSearchInHeader.asObservable();

  public searchChange$ = new BehaviorSubject<string>('');

  constructor() {}

  public showSearchBar(show: boolean) {
    this.showSearchInHeader.next(show);
  }
}
