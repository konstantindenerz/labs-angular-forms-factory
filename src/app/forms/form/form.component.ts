import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FormConfig} from '../form-config';

@Component({
  selector: 'labs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  exportAs: 'form'
})
export class FormComponent implements OnChanges {

  @Input() config?: FormConfig;

  group?: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rebuild();
  }

  private rebuild(): void {
    this.group = this.formBuilder.group({});
    this.config?.forEach(definition => {
      if (definition.type === 'text' || definition.type === 'select') {
        const control = new FormControl();
        definition.control =control;
        this.group?.addControl(definition.id, control);
      }
    })
    this.group?.valueChanges.subscribe(() => {
      this.config?.filter(def => def.type === 'group').forEach(def => {
        if(def.type === 'group'){
          if(this.group?.value[def.visible.id] === def.visible.test){
            if(!this.group?.contains(def.type)){
              const group = new FormGroup({});
              def.control = group;
              def.fields.forEach(field => {
                const control = new FormControl();
                field.control = control
                group.addControl(field.id, control);
              })
              this.group?.addControl(def.id, group, {emitEvent: false});
            }
          }else {
            delete def.control;
            this.group?.removeControl(def.id, {emitEvent: false});
          }
        }
      })
    })
  }
}
