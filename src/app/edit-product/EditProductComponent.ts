import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  produto = '';
  novoNome = '';
  novaQuantidade = 0;
  productList: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.produto = params['produto']; 
      console.log(this.produto);
      let list = localStorage.getItem('productList');
      if(list != null)
        this.productList = JSON.parse(list);
      console.log(this.productList);
    });
  }
  
  salvarEdicao() {
    this.editarProduto(this.produto, this.novoNome, this.novaQuantidade);
    this.atualizarLocalStorage();
    this.router.navigate(['/']);
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

  private atualizarLocalStorage() {
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }
}
