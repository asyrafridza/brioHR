import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobComponent } from './job/job.component';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { JobFilterPipe } from './shared/job-filter.pipe';
import { JobOpeningsCountPipe } from './shared/job-openings-count.pipe';
import { FromNowPipe } from './shared/from-now.pipe';

@NgModule({
  declarations: [JobsComponent, JobListComponent, JobComponent, JobFilterPipe, JobOpeningsCountPipe, FromNowPipe],
  imports: [
    CommonModule,
    DataViewModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [JobsComponent],
})
export class JobsModule {}
