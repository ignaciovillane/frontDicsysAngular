import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { GlobalUrl } from '../../../data/url';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { NgFor,CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { UrlNavigateService } from '../../../data/services/urlNavigation/url-navigate.service';
import { state } from '@angular/animations';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [HeaderComponent,NgFor,FooterComponent,CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  listProductosPorCategoria: any;
  public idCategoria:any;
  public nombreCategoria:any;

  constructor(
    public globalText:GlobalText,
    public globalUrl:GlobalUrl,
    public router: Router,
    public productosService:ProductosService,
    public navigateUrlService: UrlNavigateService
  )
  {
    const navegabilidad=this.router.getCurrentNavigation();
    if(navegabilidad && navegabilidad.extras && navegabilidad.extras.state){
      const data = navegabilidad.extras.state;
      this.idCategoria= data['idCategoria'];
      this.nombreCategoria= data['nombre'];
    }
    this.productosService.obtenerProductosPorID(this.idCategoria).subscribe(
      result=>{
        this.listProductosPorCategoria=result;
      }
    )
  }
  eliminarProducto(idProd: number) {
    // Confirmación antes de eliminar
    if (confirm("¿Está seguro que desea eliminar este producto?")) {
        this.productosService.eliminarProducto(idProd).subscribe(result => {
            location.reload();
        });
    }
}
//editarProducto
editarProducto(producto :any)
{
  this.navigateUrlService.navegarUrlDatos(this.globalUrl.editar,{
    state:{
      id:producto.id,
      nombre:producto.nombre,
      precio:producto.precio,
      stock:producto.stock,
      fecha_vencimiento:producto.fecha_vencimiento,
      id_categoria:producto.id_categoria

    }
  });
}
/*
navegarProducto(categoria: any ) {
  this.urlNavigateService.navegarUrlDatos(this.globalUrl.products, {
    state: {
      idCategoria:categoria.id,
      nombre: categoria.nombre 
    },
    
  });
*/

}
/*
navegarProducto(categoria: any ) {
  this.urlNavigateService.navegarUrlDatos(this.globalUrl.products, {
    state: {
      idCategoria:categoria.id,
      nombre: categoria.nombre 
    },
    
  });

}*/