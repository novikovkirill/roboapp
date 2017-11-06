import { Component, Input } from '@angular/core';

import  { Field } from './field';

@Component({
  selector: 'field',
  templateUrl: 'field/field.component.html',
  styleUrls: ['field/field.component.css']
})

export class FieldComponent {
	@Input() field: Field;
}
