import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './bejelentkezes.component.html',
  styleUrl: './bejelentkezes.component.scss'
})
export class BejelentkezesComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService,
    private router: Router,
  ) {}

  async login() {
    await this.auth.login(this.email, this.password);
    this.router.navigate(['/']);
  }

  async google() {
    await this.auth.googleLogin();
    this.router.navigate(['/']);
  }
}