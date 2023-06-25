import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca: string = ''
  subscription: Subscription;
  livro: Livro

  constructor(private service: LivroService) { }

  buscarLivros(campoBusca: string) {
      this.subscription = this.service.buscar(campoBusca).subscribe({
        next: res => {
          this.listaLivros = this.livrosResultadoParaLivros(res)
        },
        error: erro => { console.log(erro)},
        complete: () => console.log("Observable foi completo")
      })
  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}



