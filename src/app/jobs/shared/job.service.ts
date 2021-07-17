// Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Interface
import { Job } from './job.interface';
// Rxjs
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  private totalJobs: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly totalJobs$: Observable<number> =
    this.totalJobs.asObservable();

  getJobList(): Observable<Job[]> {
    return this.http
      .get('/assets/json/jobList.json')
      .pipe(map((data: any) => <Job[]>data.jobs));
  }

  getTotalJobs(): Observable<number> {
    return this.totalJobs$;
  }

  setTotalJobs(total: number) {
    this.totalJobs.next(total);
  }
}
