import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  public getControlErrors(
    control: AbstractControl | FormControl
  ): string {
    const controlErrors: ValidationErrors | null = control.errors;

    if (controlErrors?.['required']) {
      return 'Required field';
    }
    if (controlErrors?.['maxlength']) {
      const { requiredLength, actualLength } = controlErrors['maxlength'];
      return `Max length allowed ${requiredLength}, actual length ${actualLength}`;
    }
    if (controlErrors?.['email']) {
      return 'Invalid email';
    }
    if (controlErrors?.['minlength']) {
      const { requiredLength, actualLength } = controlErrors['minlength'];
      return `Min length allowed ${requiredLength}, actual length ${actualLength}`;
    }

    if (controlErrors?.['max']) {
      const { max, actual } = controlErrors['max'];
      return `Max value allowed ${max}, actual value ${actual}`;
    }

    if (controlErrors?.['min']) {
      const { actual, min } = controlErrors['min'];
      return `Min value allowed ${min}, actual value ${actual}`
    }

    if (controlErrors?.['pattern']) {
      return 'Min 1 Uppercase, 1 Lowercase, 1 Number, 1 Special character, length 6 character';
    }

    if (controlErrors?.['equalPassword']) {
      return 'Las contraseñas no coinciden';
    }
    return ''
  }

  public checkControlErrors(
    control: AbstractControl | FormControl
  ): boolean {
    return control.invalid && control.touched;
  }
}
