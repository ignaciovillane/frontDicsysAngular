import { Component } from '@angular/core';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormularioComponent],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {

}
