import { AbstractControl, ValidationErrors } from "@angular/forms";

export function equalPassword(controlName1: string, controlName2: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const control1 = control.get(controlName1);
    const control2 = control.get(controlName2);

    if (control1?.value !== control2?.value) {
      control2?.setErrors({ equalPassword: true });
    }

    return null;
  }
}
