import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appNoEmoji]',
})
export class NoEmojiDirective {
  orginalRegex = /[^\w.,\s]/g;
  regex = /[^\w.,@!#$%^&*)(-_=+;:\s]/g;

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event: any) {
    this.value = $event.target.value.replace(this.regex, '');
    $event.target.value = this.value;
    this.ngModelChange.emit(this.value);
  }
}
