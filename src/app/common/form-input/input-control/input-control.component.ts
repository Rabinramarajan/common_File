import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { FormInputControl } from '../form-input-control';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss']
})
export class InputControlComponent extends FormInputControl implements OnInit {

  Login = false;
  mandatory = false;
  @Input() searchIcon = false;
  @Output() onsearchevent: EventEmitter<any> = new EventEmitter<any>();
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xcontrol = this.control;
    // console.log(error);
  }
  
  ngOnInit(): void {
    console.log(this.value);
    
    this.setValidate(this.control);
  }

  onSearchIcon() {
    this.onsearchevent.emit();
  }

}
