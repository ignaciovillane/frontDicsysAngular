import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
@Injectable({
  providedIn: 'root'
})
export class UrlNavigateService {

  constructor(private router:Router) { }

   //1) metodo para navegar sin pasar datos
   navegarUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  //2) metodo para navegar pasando datos
  navegarUrlDatos(url: string, params: any) {
    this.router.navigateByUrl(url, params);
  }
}
