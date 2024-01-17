import {Component, Input} from '@angular/core';
import {Project, Template} from "../../models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  @Input() project!: Project;
  @Input() templates!: Template[];
  form: FormGroup;
  buildedProject = '';
  error = '';

  constructor(private fb: FormBuilder, private appService: AppService) {
    this.form = this.fb.group({
      template: ['', Validators.required],
    });
  }

  clearState() {
    this.buildedProject = '';
    this.error = '';
  }

  async submit() {
    this.form.markAsTouched();
    if (this.form.valid) {
      this.clearState();
      try {
        const result = await this.appService.buildProject(this.project.id, Number(this.form.get('template')?.getRawValue()));
        this.buildedProject = result.buildedProject;
      } catch (e) {
        this.error = "Something went wrong";
      }
    }
  }
}
