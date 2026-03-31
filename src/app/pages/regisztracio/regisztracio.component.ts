import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './regisztracio.component.html',
  styleUrl: './regisztracio.component.scss'
})
export class RegisztracioComponent {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  async register() {
    await this.auth.register(this.email, this.password);
    this.router.navigate(['/']);
  }
}