// Angular
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
// Service
import { JobService } from './shared/job.service';
// Interface
import { Job } from './shared/job.interface';
// Rxjs
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  totalJobOpenings: number = 0;

  constructor(private jobService: JobService, private cdr: ChangeDetectorRef) {}

  /************************ Angular Lifecycle *************************/
  ngOnInit(): void {
    this.jobService
      .getJobList()
      .pipe(first())
      .subscribe((data: Job[]) => {
        this.jobs = [...data];
        this.totalJobOpenings = this.jobs.length;
        this.cdr.markForCheck();
      });

    this.jobService.getTotalJobs().subscribe((total) => {
      this.totalJobOpenings = total;
      this.cdr.markForCheck();
    });
  }
}
