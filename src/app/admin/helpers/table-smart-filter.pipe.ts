import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'smartFilter'
})
@Injectable()
export class SmartFilterPipe implements PipeTransform {
    transform(items: any, filter: any, defaultFilter: boolean = false): any {
        if (!filter){
          return items;
        }
    
        if (!Array.isArray(items)){
          return items;
        }

        return items.filter(function (entry) {
          return Object.keys(filter).every(function (key) {
              if(key.includes('.')){
                let keys: any = key.split('.');
                if(keys.length === 2){
                  return Object.keys(entry[keys[0]]).every(function (key1) {
                    return new RegExp(filter[key], 'gi').test(entry[keys[0]][keys[1]]) || filter[key] === '';              
                  });
                }else if(keys.length === 3){
                  return Object.keys(entry[keys[0]]).every(function (key1) {
                    return Object.keys(entry[keys[0]][keys[1]]).every(function (key2) {
                      return new RegExp(filter[key], 'gi').test(entry[keys[0]][keys[1][keys[2]]]) || filter[key] === '';              
                    });
                  });
                }
                return;                
              }else{
                return new RegExp(filter[key], 'gi').test(entry[key]) || filter[key] === '';
              }              
          });
      });
      }
}