import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed
} from '@angular/core';

import {
  Firestore,
  collection,
  doc,
  updateDoc,
  increment,
  onSnapshot
} from '@angular/fire/firestore';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Lake } from '../../models/lake';

@Component({
  selector: 'app-to-lista',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './tavak.component.html',
  styleUrls: ['./tavak.component.scss']
})
export class ToListaComponent
implements OnInit, OnDestroy {

  private firestore =
    inject(Firestore);

  private unsubscribe?: () => void;

  tavak = signal<Lake[]>([]);

  keresoSzoveg = signal('');

  aktivTipus = signal('');

  rendezes =
    signal<'nev' | 'telepules' | 'tipus'>(
      'nev'
    );

  tipusok: string[] = [];

  uniqueCitiesCount = 0;

  rendezettTavak = computed(() => {

    const keresett =
      this.keresoSzoveg().toLowerCase();

    const tipus =
      this.aktivTipus();

    return [...this.tavak()]

      .filter(to => {

        const searchMatch =

          to.nev
            ?.toLowerCase()
            .includes(keresett)

          ||

          to.telepules
            ?.toLowerCase()
            .includes(keresett)

          ||

          to.tipus
            ?.toLowerCase()
            .includes(keresett);

        const tipusMatch =

          !tipus ||

          to.tipus === tipus;

        return (
          searchMatch &&
          tipusMatch
        );
      })

      .sort((a, b) =>

        (a[this.rendezes()] || '')
          .localeCompare(

            b[this.rendezes()] || ''
          )
      );
  });

  ngOnInit(): void {

    try {

      const colRef =
        collection(this.firestore, 'lakes');

      this.unsubscribe =
        onSnapshot(colRef, snapshot => {

          const data: Lake[] =
            snapshot.docs.map(doc => ({

              id: doc.id,

              ...(doc.data() as Omit<Lake, 'id'>)
            }));

          this.tavak.set(data);

          this.generateFilters();

          this.calculateStats();
        });

    } catch (error) {

      console.error(
        'Firebase hiba:',
        error
      );
    }
  }

  ngOnDestroy(): void {

    if (this.unsubscribe) {

      this.unsubscribe();
    }
  }

  generateFilters(): void {

    const unique =
      new Set(

        this.tavak()
          .map(to => to.tipus)
      );

    this.tipusok =
      [...unique];
  }

  calculateStats(): void {

    const cities =
      new Set(

        this.tavak()
          .map(to => to.telepules)
      );

    this.uniqueCitiesCount =
      cities.size;
  }

  async novelMegtekintes(
    toId: string
  ): Promise<void> {

    try {

      const lakeRef =
        doc(
          this.firestore,
          'lakes',
          toId
        );

      await updateDoc(
        lakeRef,
        {
          megtekintesek:
            increment(1)
        }
      );

    } catch (error) {

      console.error(
        'Megtekintés hiba:',
        error
      );
    }
  }
}