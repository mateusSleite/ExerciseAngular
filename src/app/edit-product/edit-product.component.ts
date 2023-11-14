// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  produto: string = '';
  novoNome: string = '';
  novaQuantidade: number = 0;
  productList: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.produto = params.get('produto') || '';
      const navigationState = window.history.state;
      this.productList = navigationState.productList || [];

      const product = this.getProduct(this.produto);
      if (product) {
        this.novoNome = product.produto;
        this.novaQuantidade = product.quantidade;
      }
    });
  }

  salvarEdicao() {
    this.editarProduto(this.produto, this.novoNome, this.novaQuantidade);
    this.router.navigate(['/']);
  }

  getProduct(produto: string): any {
    return this.productList.find(p => p.produto === produto);
  }

  name(event: any) {
    this.novoNome = event.target.value;
  }

  qtd(event: any) {
    this.novaQuantidade = event.target.value;
  }

  editarProduto(produto: string, novoNome: string, novaQuantidade: number): void {
    const index = this.productList.findIndex(p => p.produto === produto);
    if (index !== -1) {
      this.productList[index].produto = novoNome;
      this.productList[index].quantidade = novaQuantidade;
    }
  }
}
