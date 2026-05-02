import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Footer } from './shared/footer/footer';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, Footer, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {}