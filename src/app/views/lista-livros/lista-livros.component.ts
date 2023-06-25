import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  campoBusca: string = ''
  subscription: Subscription;

  constructor(private service: LivroService) { }

  buscarLivros(campoBusca: string) {
      this.subscription = this.service.buscar(campoBusca).subscribe({
        next: res => { console.log(res)},
        error: erro => { console.log(erro)},
        complete: () => console.log("Observable foi completo")
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}



