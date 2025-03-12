import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideLongName',
  standalone: true
})
export class HideLongNamePipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length > 8) {
      return value.slice(0, 8) + '...';  // إخفاء الاسم الزائد
    }
    return value;
  }
 


}
