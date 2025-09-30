import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface DropdownOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ],
  templateUrl: './custom-dropdown.html',
  styleUrls: ['./custom-dropdown.css']
})
export class CustomDropdownComponent implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() id: string = '';

  @Output() onChange = new EventEmitter<any>();

  isOpen = false;
  selectedOption: DropdownOption | null = null;
  private _value: any = null;

  private onChangeCallback = (value: any) => {};
  private onTouchedCallback = () => {};

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.selectedOption = this.options.find(option => option.value === val) || null;
    this.onChangeCallback(val);
  }

  writeValue(value: any): void {
    this._value = value;
    this.selectedOption = this.options.find(option => option.value === value) || null;
  }

  trackByValue(index: number, option: DropdownOption): any {
    return option.value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onTouchedCallback();
      }
    }
  }

  selectOption(option: DropdownOption): void {
    this.value = option.value;
    this.selectedOption = option;
    this.isOpen = false;
    this.onChange.emit(option.value);
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  get displayValue(): string {
    return this.selectedOption ? this.selectedOption.label : this.placeholder;
  }
}
