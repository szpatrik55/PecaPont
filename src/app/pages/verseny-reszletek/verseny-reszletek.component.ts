import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import {
  Subscription,
  switchMap
} from 'rxjs';

import { EventsService } from '../../services/events';

import { EventCategory } from '../../config/event-categories';
import { EventItem } from '../../models/event';

@Component({
  selector: 'app-verseny-reszletek',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verseny-reszletek.component.html',
  styleUrls: ['./verseny-reszletek.component.scss']
})
export class VersenyReszletekComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);

  private eventsService = inject(EventsService);

  protected cdr = inject(ChangeDetectorRef);

  verseny: EventItem | null = null;

  loading = true;

  private routeSub?: Subscription;

  ngOnInit() {

    this.routeSub = this.route.paramMap.pipe(

      switchMap(params => {

        this.loading = true;

        this.cdr.markForCheck();

        const id = params.get('id');

        return id
          ? this.eventsService.getEventById(id)
          : Promise.resolve(null);
      })

    ).subscribe({

      next: (data) => {

        this.verseny = data;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(err);

        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {

    this.routeSub?.unsubscribe();
  }
}