import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private letztesGesendetesBildSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  public letztesGesendetesBild$ : Observable<string> = this.letztesGesendetesBildSubject.asObservable();

  setLetztesGesendetesBild(bild: string) {
    this.letztesGesendetesBildSubject.next(bild);
  }
  getLetztesGesendetesBild(): string {
    return this.letztesGesendetesBildSubject.getValue();
  }
}
