import { 
  AfterViewInit,
  Component, 
  OnInit, 
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('burger') burger: any;
  @ViewChild('navLink') nav: any;
  // @ViewChild('navLink') navLink: any;

  constructor() { }

  ngAfterVIewInit(): void {
  }

  ngOnInit(): void {
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
