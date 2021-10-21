import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-create-project-entry',
  templateUrl: './create-project-entry.component.html',
  styleUrls: ['./create-project-entry.component.scss'],
})
export class CreateProjectEntryComponent implements OnInit {
  
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      pname: [null, [Validators.required]],
      type: [null, [Validators.required]],
      objects: [null, [Validators.required]],
      images: [null, [Validators.required]],
      completion: [null, [Validators.required]],
      billing: [null, [Validators.required]],
    })
  }

  post() {
    this.projectService.post(this.form.getRawValue()).subscribe();
  }

}
