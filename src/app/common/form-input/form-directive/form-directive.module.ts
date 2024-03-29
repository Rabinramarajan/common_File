import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './autofocus/autofocus.directive';
import { LimitDirective } from './limit/limit.directive';
import { LowerCaseDirective } from './lower-case/lower-case.directive';
import { NoEmojiDirective } from './no-emoji/no-emoji.directive';
import { UpperCaseDirective } from './upper-case/upper-case.directive';
import { NumberOnlyDirective } from './number-only/number-only.directive';
import { PinNumberOnlyDirective } from './pin-number-only/pin-number-only.directive';



@NgModule({
  declarations: [
    LimitDirective,
    AutofocusDirective,
    LowerCaseDirective,
    UpperCaseDirective,
    NoEmojiDirective,
    NumberOnlyDirective,
    PinNumberOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LimitDirective,
    AutofocusDirective,
    LowerCaseDirective,
    UpperCaseDirective,
    NoEmojiDirective,
    NumberOnlyDirective,
    PinNumberOnlyDirective
  ]
})
export class FormDirectiveModule { }
