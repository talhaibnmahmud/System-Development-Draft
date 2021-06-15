import { 
  Component, 
  OnInit, 
  ViewChild
} from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('burger') burger: any;
  @ViewChild('navLink') nav: any;

  constructor(public authService: AuthService) { }

  ngAfterVIewInit(): void {
  }

  ngOnInit(): void {
    this.authService.checkLoggedIn();
  }

  navSlide(): void {
    this.nav.nativeElement.classList.toggle('active');
    this.burger.nativeElement.classList.toggle('toggle');
    
    const navLinks: any = Array.from(this.nav.nativeElement.children);
    navLinks.forEach((link: any, index: number) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.25}s`;
      }
    });
  }

}
