import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'formatDatetime',
  standalone: true
})
export class FormatDatetimePipe implements PipeTransform {

  transform(time: Date): string {
    return moment(time).format('Do MMM yyyy kk:mm:ss');
  }

}
