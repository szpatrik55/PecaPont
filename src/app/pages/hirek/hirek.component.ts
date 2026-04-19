import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, collection, query, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hirek.component.html',
  styleUrl: './hirek.component.scss'
})
export class HirekComponent implements OnInit {
  private firestore = inject(Firestore);
  news$: Observable<any[]> | undefined;

  ngOnInit() {
    // A már inicializált firestore példányt használjuk
    const newsCollection = collection(this.firestore, 'news');
    const q = query(newsCollection, orderBy('letrehozva', 'desc'));
    
    // Az idField: 'id' biztosítja, hogy a dokumentum azonosítója bekerüljön az objektumba
    this.news$ = collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}