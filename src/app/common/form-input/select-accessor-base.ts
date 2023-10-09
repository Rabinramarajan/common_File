import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export class SelectAccessorBase implements ControlValueAccessor {
  public valueChange: BehaviorSubject<any>;
  constructor() {
    this.valueChange = new BehaviorSubject('');
  }

  onChange: any = () => {};
  onTouch: any = () => {};
  val = '';

  onValueChange(): Observable<any> {
    return this.valueChange.asObservable();
  }

  // sample code for watch
  // this.watchValue = this.onValueChange().subscribe((newValue) => {
  //   this.valueChanged(newValue);
  // });

  setValueChange(newValue: any): void {
    this.valueChange.next(newValue);
  }

  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.setValueChange(val);
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  get value() {
    return this.val;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
