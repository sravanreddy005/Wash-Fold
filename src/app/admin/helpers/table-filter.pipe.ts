import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any, defaultFilter: boolean = false): any {
        if (!filter){
          return items;
        }
    
        if (!Array.isArray(items)){
          return items;
        }
    
        if (filter && Array.isArray(items)) {
          let filterKeys: any = Object.keys(filter);
          if (defaultFilter) {
            return items.filter(item =>
                filterKeys.reduce((x: any, keyName: any) =>
                    (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
          }
          else {
            return items.filter(item => {
              return filterKeys.some((keyName: any) => {
                return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
              });
            });
          }
        }
      }
}