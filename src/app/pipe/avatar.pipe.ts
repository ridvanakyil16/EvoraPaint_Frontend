import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    // console.log(value)
    return value;
  }

}
