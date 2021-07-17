// Angular
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// Interface
import { Job } from '../shared/job.interface';
// 3rd party libraries
import * as moment from 'moment';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobComponent {
  @Input() job: Job;
  @Input() searchString: string = '';
  @Output() jobItemChange = new EventEmitter<Job>();
  displayDialog = false;
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.jobForm = this.fb.group({
      title: [''],
      location: [''],
      level: [''],
    });
  }

  /************************ Other Methods *************************/

  openDialog(e: Event, selectedJob: Job) {
    this.displayDialog = true;
    this.jobForm.patchValue(selectedJob);
    e.preventDefault();
  }

  updateJob(updatedJob: any) {
    const updatedAt = moment().toISOString();
    this.job = { ...this.job, ...updatedJob, updatedAt };
    this.jobItemChange.emit(this.job);
    this.displayDialog = false;
    this.cdr.markForCheck();
  }
}
