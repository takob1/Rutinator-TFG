import { Pipe, PipeTransform } from '@angular/core';
import { Rutina } from 'src/compartido/rutina';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    return list
      ? list.filter(
          (item) => item.name.search(new RegExp(filterText, 'i')) > -1
        )
      : [];
  }
}
