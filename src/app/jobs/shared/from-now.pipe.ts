// Angular
import { Pipe, PipeTransform } from '@angular/core';
// Interface
import { ISODate } from './job.interface';
// 3rd party libraries
import * as moment from 'moment';

@Pipe({
  name: 'fromNow',
})
export class FromNowPipe implements PipeTransform {
  transform(isoDate: ISODate): unknown {
    return moment(isoDate).fromNow();
  }
}
