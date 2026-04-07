import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '@services/carrinho.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from '@services/produtos.service'; // ✅ importar

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  termoBusca: string = '';

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router,
    private produtosService: ProdutosService   // ✅ injetar aqui
  ) {}

  ngOnInit(): void {
    console.log('HeaderComponent inicializado');
  }

  buscar(event?: Event): void {
    if (event) event.preventDefault();

    if (this.termoBusca.trim()) {
      const termo = this.termoBusca.toLowerCase();

      // lista de servidores (IDs 16–30)
      const servidores = this.produtosService.getServidores();

      const ehServidor = termo.includes('servidor') ||
        servidores.some(s =>
          s.nome.toLowerCase().includes(termo) ||
          s.descricao.toLowerCase().includes(termo)
        );

      if (ehServidor) {
        this.router.navigate(['/servidores'], {
          queryParams: { busca: this.termoBusca },
        });
      } else {
        this.router.navigate(['/produtos'], {
          queryParams: { busca: this.termoBusca },
        });
      }
    }
  }
}
