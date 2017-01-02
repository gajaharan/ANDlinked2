import {FormGroup} from "@angular/forms";

export function validateForm(form: FormGroup, field: string, error: string) {

  return form.controls[field].dirty
    && form.controls[field].errors &&
    form.controls[field].errors[error];
}

