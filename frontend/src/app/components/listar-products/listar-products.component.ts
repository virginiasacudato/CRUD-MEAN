import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listar-products',
  templateUrl: './listar-products.component.html',
  styleUrls: ['./listar-products.component.css']
})
export class ListarProductsComponent implements OnInit {

  listarproducts: Product[] = [];

  constructor(private _productService: ProductService, private toastr: ToastrService) { } //Toastr para mensajes de error

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getproducts().subscribe(data => {
      console.log(data);
      this.listarproducts = data.obj;
    }, error =>{
      console.log(error);
    })
  }

  deleteProduct(id: any) {
    this._productService.deleteproduct(id).subscribe(data =>{
     this.toastr.error('El producto fue eliminado correctamente', 'Producto eliminado.');
     this.getProducts();
    }, error => {
     console.log(error);
    })
  }
}
