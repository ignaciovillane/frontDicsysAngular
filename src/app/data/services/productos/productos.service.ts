import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../../interfaces/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url='http://localhost:4000/api/productos/'
  constructor(private http:HttpClient) { }

  public obtenerProductosPorID(idCategoria:number)
  {
    return this.http.get(this.url+idCategoria)
  }
  public eliminarProducto(idProducto: number)
  {
    return this.http.delete(this.url+idProducto)
  }
  public crearProducto(producto: Producto): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.url, producto, { headers });
  }
  public actualizarProducto(idProducto: number, producto: Producto): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<any>(`${this.url}${idProducto}`, producto, { headers });
  }
}
