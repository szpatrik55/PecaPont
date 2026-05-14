import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { LakeService } from '../../services/lake';

import { Lake } from '../../models/lake';

type EditLakeForm =
  Omit<
    Lake,

    | 'id'
    | 'halfajok'
    | 'szabalyok'
    | 'ajanlott_modszerek'
    | 'megtekintesek'
    | 'letrehozva'
  >
  &
  {
    halfajok: string;
    szabalyok: string;
    ajanlott_modszerek: string;
  };

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.scss'
})
export class ManagerDashboardComponent {

  private authService =
    inject(AuthService);

  private lakeService =
    inject(LakeService);

  lakes = signal<Lake[]>([]);

  loading = signal(true);

  // =========================
  // MODAL
  // =========================

  editModalOpen =
    signal(false);

  selectedLake =
    signal<Lake | null>(null);

  editLake =
    signal<EditLakeForm>({

      nev: '',
      telepules: '',

      kepUrl: '',
      kepUtvonal: '',

      tipus: '',
      cim: '',
      leiras: '',

      terulet_ha: null,
      vizmelyseg: null,
      helyek_szama: null,

      sport_napijegy_ar: null,

      halfajok: '',
      szabalyok: '',
      ajanlott_modszerek: '',

      ejszakai_horgaszat: false,
      csonak_hasznalat: false,

      managerId: '',
      managerName: ''
    });

  constructor() {

    this.authService.appUser$
      .subscribe(user => {

        if (!user?.uid) {

          this.loading.set(false);
          return;
        }

        if (
          user.role !== 'manager'
          &&
          user.role !== 'admin'
        ) {

          this.loading.set(false);
          return;
        }

        this.lakeService
          .getManagedLakes(user.uid)
          .subscribe(lakes => {

            this.lakes.set(lakes);

            this.loading.set(false);
          });
      });
  }

  // =========================
  // MODAL NYITÁS
  // =========================

  openEditModal(
    lake: Lake
  ) {

    this.selectedLake.set(
      lake
    );

    this.editLake.set({

      nev:
        lake.nev || '',

      telepules:
        lake.telepules || '',

      kepUrl:
        lake.kepUrl || '',

      kepUtvonal:
        lake.kepUtvonal || '',

      tipus:
        lake.tipus || '',

      cim:
        lake.cim || '',

      leiras:
        lake.leiras || '',

      terulet_ha:
        lake.terulet_ha || null,

      vizmelyseg:
        lake.vizmelyseg || null,

      helyek_szama:
        lake.helyek_szama || null,

      sport_napijegy_ar:
        lake.sport_napijegy_ar || null,

      halfajok:
        Array.isArray(lake.halfajok)
          ? lake.halfajok.join(', ')
          : '',

      szabalyok:
        Array.isArray(lake.szabalyok)
          ? lake.szabalyok.join(', ')
          : '',

      ajanlott_modszerek:
        Array.isArray(lake.ajanlott_modszerek)
          ? lake.ajanlott_modszerek.join(', ')
          : '',

      ejszakai_horgaszat:
        lake.ejszakai_horgaszat || false,

      csonak_hasznalat:
        lake.csonak_hasznalat || false,

      managerId:
        lake.managerId || '',

      managerName:
        lake.managerName || ''
    });

    this.editModalOpen.set(
      true
    );
  }

  // =========================
  // MODAL ZÁRÁS
  // =========================

  closeModal() {

    this.editModalOpen.set(
      false
    );

    this.selectedLake.set(
      null
    );
  }

  // =========================
  // KÉP FELTÖLTÉS
  // =========================

  async onFileSelected(
    event: Event
  ) {

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) return;

    await this.handleImage(file);
  }

  async onDrop(
    event: DragEvent
  ) {

    event.preventDefault();

    const file =
      event.dataTransfer?.files?.[0];

    if (!file) return;

    await this.handleImage(file);
  }

  onDragOver(
    event: DragEvent
  ) {

    event.preventDefault();
  }

  async handleImage(
    file: File
  ) {

    const localUrl =
      URL.createObjectURL(file);

    this.editLake.set({

      ...this.editLake(),

      kepUrl: localUrl
    });

    // később firebase storage upload ide jön
  }

  // =========================
  // MENTÉS
  // =========================

  async saveLake() {

    const lake =
      this.selectedLake();

    if (!lake?.id) return;

    try {

      const form =
        this.editLake();

      await this.lakeService
        .updateLake(

          lake.id,

          {

            ...form,

            halfajok:
              form.halfajok
                ? form.halfajok
                    .split(',')
                    .map(f => f.trim())
                : [],

            szabalyok:
              form.szabalyok
                ? form.szabalyok
                    .split(',')
                    .map(s => s.trim())
                : [],

            ajanlott_modszerek:
              form.ajanlott_modszerek
                ? form.ajanlott_modszerek
                    .split(',')
                    .map(m => m.trim())
                : []
          }
        );

      alert(
        'Sikeres mentés!'
      );

      this.closeModal();

    } catch (err) {

      console.error(err);

      alert(
        'Mentési hiba'
      );
    }
  }
}