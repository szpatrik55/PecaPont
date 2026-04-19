import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// FIGYELEM: Csak és kizárólag @angular/fire/firestore!
import { 
  Firestore, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp 
} from '@angular/fire/firestore';

interface NewsItem {
  id: string;
  cim: string;
  rovidLeiras: string;
  tartalom: string;
  kepUrl?: string;
  letrehozva: Timestamp;
}

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './hirek.component.html',
  styleUrls: ['./hirek.component.scss']
})
export class HirekComponent implements OnInit {
  private firestore = inject(Firestore);

  // Signalok az adatokhoz
  allNews = signal<NewsItem[]>([]);
  searchTerm = signal('');

  // Szűrt lista (Computed)
  filteredNews = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return this.allNews().filter(news => 
      news.cim.toLowerCase().includes(search) || 
      news.rovidLeiras.toLowerCase().includes(search)
    );
  });

  async ngOnInit(): Promise<void> {
    try {
      // Itt hívjuk meg a kollekciót az injektált firestore-ral
      const colRef = collection(this.firestore, 'news');
      const q = query(colRef, orderBy('letrehozva', 'desc'));
      
      // Egyszeri lekérés (ahogy a tavaknál csináltad)
      const snapshot = await getDocs(q);

      const adatok: NewsItem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      }));

      this.allNews.set(adatok);
    } catch (error) {
      console.error('Firebase hiba a híreknél:', error);
    }
  }
}