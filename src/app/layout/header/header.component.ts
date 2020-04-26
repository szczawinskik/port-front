import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/commons/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

  setAdmin() {
    this.authService.setAdmin();
  }
  setUser() {
    this.authService.setUser();
  }
}
