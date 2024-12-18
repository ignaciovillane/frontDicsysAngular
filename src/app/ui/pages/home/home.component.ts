import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import { CategoriasService } from '../../../data/services/categorias/categorias.service';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { GlobalUrl } from '../../../data/url';
import { GlobalText } from '../../../data/text';
import { UrlNavigateService } from '../../../data/services/urlNavigation/url-navigate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,SliderComponent,FooterComponent,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
arrayCategorias: any;
constructor(
  public categoriaService: CategoriasService,
  public productosService:ProductosService,
  public globalUrl: GlobalUrl,
  public globalText: GlobalText,
  public urlNavigateService: UrlNavigateService
){
  this.categoriaService.getCategorias().subscribe(result=>{
    this.arrayCategorias=result;
  })
}

navegarProducto(categoria: any ) {
  this.urlNavigateService.navegarUrlDatos(this.globalUrl.products, {
    state: {
      idCategoria:categoria.id,
      nombre: categoria.nombre 
    },
    
  });

}
}
