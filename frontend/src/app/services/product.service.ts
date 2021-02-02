import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
url = 'http://localhost:3000/api/products/';
  constructor(private http: HttpClient) { } // Insertamos la clase Http client 

getproducts(): Observable<any> {
  return this.http.get(this.url);
}
deleteproduct(id: String): Observable<any> {
  return this.http.delete(this.url + id);
}
saveproduct(producto: Product): Observable<any> {
  return this.http.post(this.url, producto);
}
getproduct(id: String): Observable<any> {
  return this.http.get(this.url + id);
}
editproduct(id: String, product: Product): Observable<any> {
  return this.http.put(this.url + id, product);
}
}
