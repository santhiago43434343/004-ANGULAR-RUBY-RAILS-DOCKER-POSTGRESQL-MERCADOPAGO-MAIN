import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-step-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-review.component.html',
  styleUrls: ['./step-review.component.scss']
})
export class StepReviewComponent implements OnInit {
  @Input() orderData: any;
  @Output() back = new EventEmitter<void>();
  @Output() finish = new EventEmitter<void>();

  listaDePedidos: any[] = [];
  erro: string | null = null;

  constructor(
    private pedidoService: PedidoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.listarPedidos();
    }
  }

  concluirPedido(): void {
    if (!this.orderData || !this.orderData.cart || this.orderData.cart.length === 0) {
      alert('⚠️ Erro: O carrinho está vazio.');
      return;
    }
    this.finish.emit();
  }

  listarPedidos(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.pedidoService.listarPedidos().subscribe({
        next: (res) => {
          this.listaDePedidos = res;
          this.erro = null;
        },
        error: (err) => {
          console.error("Erro ao carregar histórico:", err);
          this.erro = "Não foi possível carregar o histórico.";
        }
      });
    }
  }

  // ✅ Adicionado 'event' para parar a propagação e não criar novo pedido
  atualizarStatus(id: number, event: Event): void {
    event.stopPropagation(); // 🛡️ O ESCUDO: Impede disparar outros cliques
    
    const novoStatus = prompt("Digite o novo status (pendente, pago, cancelado):", "pago");
    if (novoStatus) {
      this.pedidoService.atualizarPedido(id, { status: novoStatus.toLowerCase() }).subscribe({
        next: () => this.listarPedidos(),
        error: (err) => console.error("Erro ao atualizar status:", err)
      });
    }
  }

  // ✅ Adicionado 'event' aqui também
  excluir(id: number, event: Event): void {
    event.stopPropagation(); // 🛡️ Impede efeitos colaterais no card
    
    if (confirm(`Deseja excluir permanentemente o pedido #${id}?`)) {
      this.pedidoService.excluirPedido(id).subscribe({
        next: () => {
          this.listaDePedidos = this.listaDePedidos.filter(p => p.id !== id);
        },
        error: (err) => console.error("Erro ao excluir:", err)
      });
    }
  }
}