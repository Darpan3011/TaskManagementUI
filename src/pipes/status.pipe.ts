import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {

  transform(value: number): string {

    if(value === 0){
      return "Pending"
    }
    else if(value == 1){
      return "In Progress"
    }
    else if(value==2){
      return "Completed"
    }

    return "Blank";
  }

}
