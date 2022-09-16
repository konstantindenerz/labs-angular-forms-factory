import {FormControl, FormGroup} from '@angular/forms';

export interface TextField {
  id: string;
  type: 'text';
  control?: FormControl;
}

export interface SelectField {
  id: string;
  type: 'select';
  values: string[];
  control?: FormControl;
}

export interface FormFieldGroup {
  id: 'string';
  type: 'group';
  visible: { id: string, test: string };
  fields: (TextField | SelectField)[];
  control?: FormGroup;
}

export type FormConfig = (TextField | SelectField | FormFieldGroup)[];
