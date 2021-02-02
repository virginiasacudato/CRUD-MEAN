import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product'; // Importación de modelo Product
import { ProductService } from 'src/app/services/product.service'; // Importación de servicio producto

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm: FormGroup;
  title= 'Crear Producto';
  id: String | null; // Ya que el ID puede ser nulo

constructor(private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService, 
    private _productService: ProductService,
    private aRouter: ActivatedRoute) { 
    
      this.productForm = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');  // Acceder al ID de la URL edit-product
    // El parametro que recibe get debe corresponder al nombre especificado en el routing module
    // es decir, en este caso es: /edit-product/:id
  }

  ngOnInit(): void {
    this.isEdit();
  }

   agregarProducto(){
     console.log(this.productForm)
    // Obtener valores que llegan a consola
     const PRODUCTO: Product = {
       name : this.productForm.get('product')?.value,
       category : this.productForm.get('category')?.value,
       price : this.productForm.get('price')?.value,
       location : this.productForm.get('location')?.value,

     }
     
    if(this.id !== null) {
       //Editamos producto
       this._productService.editproduct(this.id, PRODUCTO).subscribe(data =>{
        this.toastr.info('Producto editado correctamente 🥰', 'Actualizado!'); 
        this.router.navigate(['/']);
       }, error =>{
        console.log(error);
        this.productForm.reset();
        this.toastr.error('No pudimos crear tu producto intentalo más tarde 😢', 'Error!');
      })
    } else{
       // Agregamos producto
       
     console.log(PRODUCTO);
     this._productService.saveproduct(PRODUCTO).subscribe(data =>{
      this.toastr.success('Producto creado correctamente 🤑', 'Exito!'); 
      this.router.navigate(['/']);
    }, error =>{
      console.log(error);
      this.productForm.reset();
      this.toastr.error('No pudimos crear tu producto intentalo más tarde 😢', 'Error!');
    })
    }

  }
  
  isEdit(){
// Preguntamos si id es diferente de nulo
    if(this.id !== null){
      // Entonces el titulo va a cambiar
      this.title = 'Editar Producto';
      this._productService.getproduct(this.id).subscribe(data =>{
        this.productForm.setValue({
          product: data.obj.name,
          category: data.obj.category,
          price: data.obj.price,
          location: data.obj.location
        })
      })
    }
  }


}
