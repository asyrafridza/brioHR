// Angular
import { Pipe, PipeTransform } from '@angular/core';
// Interface
import { Job } from './job.interface';

@Pipe({
  name: 'jobOpeningsCount',
})
export class JobOpeningsCountPipe implements PipeTransform {
  transform(jobs: Job[], value: string): number {
    if (!jobs) return 0;
    if (!value) return jobs.length;

    return jobs.filter((job) =>
      job.title.toUpperCase().includes(value.toUpperCase())
    ).length;
  }
}
