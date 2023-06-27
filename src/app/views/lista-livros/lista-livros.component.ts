import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { Livro } from 'src/app/models/livro.model';
import { LivrosResultado } from 'src/app/models/volumes-resultado.model';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  livro: Livro;
  mensagemErro: string = '';
  livrosResultado: LivrosResultado;

  constructor(private service: LivroService) { }
  
  totalDeLivros$ = this.campoBusca.valueChanges
      .pipe(
          debounceTime(PAUSA),
          filter((valorDigitado) => valorDigitado.length >= 3),
          tap(() => console.log('Fluxo inicial')),
          switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
          map(resultado => this.livrosResultado = resultado),
          catchError(erro => {
              console.log(erro)
              return of()
          })
      )

  livrosEncontrados$ = this.campoBusca.valueChanges
  .pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap((retornoAPI) => console.log(retornoAPI)),
    map((res) => res.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError((error) => {
      // this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação'
      // return EMPTY
      console.log("Error:", error)
      return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação'))
    })
  )
    
  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}



