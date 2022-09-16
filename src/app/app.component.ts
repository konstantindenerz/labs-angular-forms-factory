import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FormConfig} from './forms/form-config';
import {FormComponent} from './forms/form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'labs-angular-forms-factory';

  config?: FormConfig;

  async ngOnInit(): Promise<void> {
    this.config = await fetch('assets/sample-form.json').then(response => response.json());
  }


}
