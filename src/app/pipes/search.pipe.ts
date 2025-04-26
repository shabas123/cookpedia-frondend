import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allRecipies:any[], searchKey:string ): any[] {
    let result :any = []
    if(!allRecipies || searchKey == ''){
      return allRecipies
    }
    result = allRecipies.filter((item:any)=>item.name.toLowerCase().includes(searchKey.toLowerCase()))
    return result;
  }

}
