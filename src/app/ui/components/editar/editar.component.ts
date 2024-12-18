import { Component ,OnInit} from '@angular/core';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { CategoriasService } from '../../../data/services/categorias/categorias.service';
import { Producto } from '../../../interfaces/producto';
import { FormsModule } from '@angular/forms'; 
import { NgFor,NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule,FooterComponent,HeaderComponent, NgFor,NgIf],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{
  producto: Producto = {
    nombre: '',
    precio: 0,
    stock: 0,
    fecha_vencimiento: new Date().toISOString().slice(0, 19).replace('T', ' '),
    id_categoria: 0
  };
  idProd :any;
  arrayCategorias: any; 
  public loading = false;
  public error = '';
  constructor(
    public productosService: ProductosService,
    public categoriaService: CategoriasService,
    public router: Router,
  ) 
  {
   
    const navegabilidad=this.router.getCurrentNavigation();
    if(navegabilidad && navegabilidad.extras && navegabilidad.extras.state)
    {
      const data = navegabilidad.extras.state;
      this.idProd=data['id'];
      this.producto.nombre=data['nombre'];
      this.producto.precio=data['precio'];
      this.producto.stock=data['stock'];
      this.producto.fecha_vencimiento=data['fecha_vencimiento'];
      this.producto.id_categoria=data['id_categoria'];
    }
  }
  ngOnInit() {
    this.categoriaService.getCategorias().subscribe({
      next: (result) => {
        this.arrayCategorias = result;
        console.log('Categorias:', result);
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  editarProducto() {
    this.loading = true;
    
    try {
    
      this.productosService.actualizarProducto(this.idProd,this.producto).subscribe({
        next: (data) => {
          console.log('Producto actualizado:', data);
          alert('Producto actualizado')
          this.loading = false;
          this.resetFormulario();
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('Error al realizar la operación:', error);
      this.loading = false;
    }
  }

  resetFormulario() {
    this.producto = {
      nombre: '',
      precio: 0,
      stock: 0,
      fecha_vencimiento: new Date().toISOString().slice(0, 19).replace('T', ' '),
      id_categoria: 0
    };
  }
}
