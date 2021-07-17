// Angular
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// Interface
import { Job } from '../shared/job.interface';
// Service
import { JobService } from '../shared/job.service';
// Rxjs
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() jobs: Job[] = [];
  jobsByDepartment = {};
  departments = [];
  jobListForm: FormGroup;
  ngUnsubscribe: Subject<any> = new Subject();
  searchString: string;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private jobService: JobService
  ) {
    this.jobListForm = this.fb.group({
      searchString: [''],
    });
  }

  /************************ Angular Lifecycle *************************/
  ngOnInit() {
    this.jobListForm
      .get('searchString')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value) => {
        this.searchString = value;
        const totalJobCount = this.jobs.filter((job) => {
          return job.title.toUpperCase().includes(value.toUpperCase());
        }).length;
        this.jobService.setTotalJobs(totalJobCount);
        this.cdr.markForCheck();
      });
  }

  ngOnChanges() {
    this.jobsByDepartment = this.groupJobByDepartment(this.jobs);
    this.departments = Object.keys(this.jobsByDepartment);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /************************ Other methods *************************/

  private groupJobByDepartment(jobs: Array<Job>) {
    return jobs.reduce((acc, curr) => {
      if (!acc[curr.department]) acc[curr.department] = [];
      acc[curr.department].push(curr);
      return acc;
    }, {});
  }

  updateJobList(job: Job) {
    if (!job) return;

    const { department } = job;
    let updatedJobsByDepartment = { ...this.jobsByDepartment };
    updatedJobsByDepartment[department] = updatedJobsByDepartment[
      department
    ].map((item) => {
      return item.id === job.id ? { ...item, ...job } : item;
    });

    this.jobsByDepartment = { ...updatedJobsByDepartment };
    this.cdr.markForCheck();
  }

  trackByTitle(index, job) {
    return job.title;
  }
}
