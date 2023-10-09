import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export class ValueAccessorBase<T> implements ControlValueAccessor {
  public innerValue!: T;
  public changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();
  public routerInfo: BehaviorSubject<boolean>;
  public valueChange: BehaviorSubject<any>;
  //   static value: any;

  constructor() {
    this.valueChange = new BehaviorSubject('');
    this.routerInfo = new BehaviorSubject<boolean>(false);
  }

  onValueChange(): Observable<any> {
    return this.valueChange.asObservable();
  }

  setValueChange(newValue: any): void {
    this.valueChange.next(newValue);
  }

  getValue(): Observable<boolean> {
    return this.routerInfo.asObservable();
  }
  setValue(newValue: any): void {
    this.routerInfo.next(newValue);
  }
  get value(): T {
    // console.log(this.innerValue);
    return this.innerValue;
  }
  set value(value: T) {
    // console.log('value is: ' + this.innerValue);
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.setValueChange(value);
      // this.setValue(true)
      // console.log(value);
      this.changed.forEach((f) => f(value));
    }
  }
  touch() {
    this.touched.forEach((f) => f());
  }
  writeValue(value: T) {
    // console.log('write: ' + this.value);
    this.innerValue = value;
    this.setValue(true);

  }
  registerOnChange(fn: (value: T) => void) {
    // console.log(fn);
    this.changed.push(fn);
  }
  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}
