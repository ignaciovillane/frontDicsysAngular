import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { CategoriasService } from '../../../data/services/categorias/categorias.service';
import { Producto } from '../../../interfaces/producto';
import { FormsModule } from '@angular/forms'; 
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, NgFor,NgIf ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  producto: Producto = {
    nombre: '',
    precio: 0,
    stock: 0,
    fecha_vencimiento: new Date().toISOString().slice(0, 19).replace('T', ' '),
    id_categoria: 0
  };
  arrayCategorias: any; 
  public loading = false;
  public error = '';

  constructor(
    public productosService: ProductosService,
    public categoriaService: CategoriasService
  ) {}

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

  crearProducto() {
    this.loading = true;
    
    try {
    
      this.productosService.crearProducto(this.producto).subscribe({
        next: (data) => {
          console.log('Producto creado:', data);
          alert('Producto creado')
          this.loading = false;
          this.resetFormulario();
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
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