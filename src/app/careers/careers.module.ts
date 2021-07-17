import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CareersComponent } from './careers.component';
import { JobsModule } from '../jobs/jobs.module';

@NgModule({
  declarations: [CareersComponent],
  imports: [CommonModule, CardModule, JobsModule],
  exports: [CareersComponent],
})
export class CareersModule {}
