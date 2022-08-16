import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageURL'
})
export class LanguageURLPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `assets/flag-icons/${value}.png`;
  }

}
