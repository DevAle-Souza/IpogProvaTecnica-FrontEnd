import { Component, Input, Output, EventEmitter, forwardRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-password.html',
  styleUrls: ['./custom-password.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomPasswordComponent),
      multi: true
    }
  ]
})
export class CustomPasswordComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Digite sua senha';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() id: string = '';

  @Output() onChange = new EventEmitter<string>();

  showPassword = false;
  private _value: string = '';
  private onChangeCallback: (_: string) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(val);
      this.onChange.emit(val);
    }
  }

  writeValue(value: string): void {
    this._value = value || '';
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

  togglePasswordVisibility(): void {
    if (!this.disabled) {
      this.showPassword = !this.showPassword;
      this.onTouchedCallback();
    }
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  }

  onBlur(): void {
    this.onTouchedCallback();
  }

  get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  get toggleIcon(): string {
    return this.showPassword ? 'pi pi-eye-slash' : 'pi pi-eye';
  }
}
