import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';
import { GlobalUrl } from '../../../data/url';
import { UrlNavigateService } from '../../../data/services/urlNavigation/url-navigate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
constructor(
  public globalText:GlobalText,
  public urlNavigateServide: UrlNavigateService,
  public globalUrl:GlobalUrl
){}
  navegarHome(){
    this.urlNavigateServide.navegarUrl(this.globalUrl.home);
  }
  navegarCrear()
  {
    this.urlNavigateServide.navegarUrl(this.globalUrl.crear);
  }
}
