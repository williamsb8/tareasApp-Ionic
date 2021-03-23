import { Lista } from './../models/lista.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista [], completada: boolean = true ): Lista [] {

    return listas.filter ( lista => lista.terminada === completada);

  }

}
