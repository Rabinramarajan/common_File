import { Directive, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { NgControl, Validators } from "@angular/forms";
import { FormAccessorBase } from "./form-accessor-base";

@Directive()

export class FormInputControl extends FormAccessorBase{
    xcontrol: any = NgControl;
    // Core Input
    @Input() name = "";
    @Input() matInput = false;
    @Input() normalInput = false;
    @Input() primeInput = false;
    @Input() placeholder = "";
    @Input() label = "";
    @Input() upperCase = false;
    @Input() lowerCase = false;
    @Input() search = false;
    // @Input() required = false;
    @Input() public isMailValid = true;
    @Input() autofocus = false;
    @Input() email = false;
    @Input() tabindex = '';

    // Applicable only number input
    // @Input() public limit = -1;
    @Input() public decimal = 0;
    @Input() public max = -1;
    @Input() public min = -1;
    @Input() public minlength = -1;
    @Input() public maxlength = -1;

    public valuetypeNow: string = '';
    _changeInterval: any = null;

    @Input()
    set valuetype(valuetype: string) {
        this.valuetypeNow = valuetype || "";
        this.setValidate(this.xcontrol);
    }
    get valuetype() { 
        return this.valuetypeNow;
    }

    errorTrueNow = false;

    @Input()
    set errorTrue(errorTrue: boolean) {
        this.errorTrueNow = errorTrue || false;
    }
    get errorTrue() {
        return this.errorTrueNow;
    }

    requiredNow = false;

    @Input()
    set required(required: boolean) {
        this.requiredNow = required || false;
        this.setValidate(this.xcontrol);
    }
    get required() {
        return this.requiredNow;
    }


    btnClickedNow = false;
    @Input()
    set btnClicked(btnClicked: boolean) {
        this.btnClickedNow = btnClicked || false;
    }
    get btnClicked() {
        return this.btnClickedNow;
    }

    errorTextNow = '';
   
    @Input()
   
    set errorText(errorText: string) {
        this.errorTextNow = errorText || '';
        // console.log(this.errorTextNow ,"80");
        
    }
    get errorText() {
        return this.errorTextNow;
        // console.log(this.errorTextNow);
    }



    @Output('clear') clear: EventEmitter<any> = new EventEmitter();

    onClear() {
        this.value = '';
        this.clear.emit();
    }

    @Output('onBlur') onBlur: EventEmitter<any> = new EventEmitter();

    doBlur() {
        this.onBlur.next(this.value);
    }

    @Output('onFocus') onFocus: EventEmitter<any> = new EventEmitter();

    doFocus() {
        this.onFocus.next(this.value);
    }

    @Output('onEnter') onEnter: EventEmitter<any> = new EventEmitter();
    checkEnter(event: any) {
        if (event.key === 'Enter') {
            this.onEnter.next(this.value);
        }
        if (event.key === 'Tab') {
            this.onTab.next(this.value);
        }
    }

    @Output('onTab') onTab: EventEmitter<any> = new EventEmitter();


    @ViewChild('forminput', { static: false }) forminput!: ElementRef;
    setFocus() {
        this.forminput.nativeElement.focus();
        this.forminput.nativeElement.select();
    }

    @Output('onSearch') onSearch: EventEmitter<any> = new EventEmitter();

    doSearch() {
        this.onSearch.next(this.value);
    }

    @Output('change') change: EventEmitter<any> = new EventEmitter();

    doChange(event: any) {
        this.change.next(event);
    }

    onKeyupEvent(event: any) {
        if (this._changeInterval) {
            clearInterval(this._changeInterval);
        }
        this._changeInterval = setInterval(() => {
            this.change.next(this.value);
            clearInterval(this._changeInterval)
        }, 1000);
    }

    setValidate(control: NgControl) {
        // console.log(control);
        let validation = [];
        if (this.required) {
            validation.push(Validators.required);
        }
        if (this.email) {
            validation.push(Validators.email);
        }
        if (this.valuetypeNow === 'int' && this.decimal === 0) {
            let pattern = /^[1-9][0-9]*$/;
            validation.push(Validators.pattern(pattern));
        }
        if (this.valuetypeNow === 'int' && this.decimal > 0) {
            let newRegex = new RegExp('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,' + this.decimal + '})?\\s*$');
            // let newRegex = /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/;
            //
            validation.push(Validators.pattern(newRegex));

        }
        if (this.min > -1) {
            validation.push(Validators.min(this.min));
        }
        if (this.max > -1) {
            validation.push(Validators.max(this.max));
        }
        if (this.minlength > -1) {
            validation.push(Validators.minLength(this.minlength));
        }
        if (this.maxlength > -1) {
            validation.push(Validators.maxLength(this.maxlength));
        }


        control?.control?.setValidators(validation);
        control?.control?.updateValueAndValidity();
        // console.log(control);
    }

    // onInputChange() {
    //     debugger
    //     if (this.value.trim() !== '') {
    //         this.value = this.value.trim(); // Trim any leading/trailing spaces
    //         this.value += ' '; // Add a space to trigger CSS transition
    //         this.value = this.value.trim(); // Remove the space
    //     }
    // }

}
