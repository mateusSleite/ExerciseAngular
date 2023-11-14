// Importe Router para usar navegação
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  mostrarComprados = true;
  list = [
    { produto: 'arroz', quantidade: 4, comprado: false },
    { produto: 'leite', quantidade: 4, comprado: false },
    { produto: 'nescau', quantidade: 1, comprado: false },
  ];

  produto = '';
  quantidade = 0;

  constructor(private router: Router) {}

  markCheckbox(event: any, produto: string) {
    this.list.forEach((it) => {
      if (it.produto === produto) it.comprado = event.target.checked;
    });
  }

  showComprados(event: any) {
    this.mostrarComprados = !event.target.checked;
  }

  deleteProduto(produto: string) {
    this.list = this.list.filter((item) => item.produto !== produto);
  }

  name(event: any) {
    this.produto = event.target.value;
  }

  qtd(event: any) {
    this.quantidade = event.target.value;
  }

  adicionarProduto() {
    this.list.push({ produto: this.produto, quantidade: this.quantidade, comprado: false });
  }

  editarProduto(produto: string) {
    this.router.navigate(['/edit', produto], { state: { productList: this.list } });
  }
}
