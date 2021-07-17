// Angular
import { Pipe, PipeTransform } from '@angular/core';
// Interface
import { Job } from './job.interface';

@Pipe({
  name: 'jobFilter',
})
export class JobFilterPipe implements PipeTransform {
  transform(jobs: Job[], value: string): Job[] {
    if (!jobs) return [];
    if (!value) return jobs;

    return jobs.filter((job) =>
      job.title.toUpperCase().includes(value.toUpperCase())
    );
  }
}
