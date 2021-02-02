import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListarProductsComponent } from './components/listar-products/listar-products.component';
import { NewProductComponent } from './components/new-product/new-product.component';

const routes: Routes = [
  {path: '', component: ListarProductsComponent}, // En caso de que no haya nada en la ruta disparara Listarcomponent
  {path: 'new-product', component: NewProductComponent },
  {path: 'edit-product/:id', component: NewProductComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
