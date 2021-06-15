import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
