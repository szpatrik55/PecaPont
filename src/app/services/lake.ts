import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  where,
  updateDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Lake } from '../models/lake';

@Injectable({
  providedIn: 'root'
})
export class LakeService {

  private firestore =
    inject(Firestore);

  // =========================
  // ÖSSZES TÓ
  // =========================
  getLakes():
    Observable<Lake[]> {

    const ref =
      collection(
        this.firestore,
        'lakes'
      );

    return collectionData(
      ref,
      {
        idField: 'id'
      }
    ) as Observable<Lake[]>;
  }

  // =========================
  // EGY TÓ
  // =========================
  getLakeById(
    lakeId: string
  ): Observable<Lake | null> {

    const ref =
      doc(
        this.firestore,
        `lakes/${lakeId}`
      );

    return docData(
      ref,
      {
        idField: 'id'
      }
    ) as Observable<Lake | null>;
  }

  // =========================
  // KEZELT TAVAK
  // =========================
  getManagedLakes(
    managerId: string
  ): Observable<Lake[]> {

    const ref =
      collection(
        this.firestore,
        'lakes'
      );

    const q =
      query(
        ref,
        where(
          'managerId',
          '==',
          managerId
        )
      );

    return collectionData(
      q,
      {
        idField: 'id'
      }
    ) as Observable<Lake[]>;
  }

  // =========================
  // MANAGER HOZZÁRENDELÉS
  // =========================
  async assignManager(
    lakeId: string,
    managerId: string,
    managerName: string
  ): Promise<void> {

    const ref =
      doc(
        this.firestore,
        `lakes/${lakeId}`
      );

    await updateDoc(
      ref,
      {
        managerId,
        managerName
      }
    );
  }

  // =========================
  // MANAGER ELTÁVOLÍTÁS
  // =========================
  async removeManager(
    lakeId: string
  ): Promise<void> {

    const ref =
      doc(
        this.firestore,
        `lakes/${lakeId}`
      );

    await updateDoc(
      ref,
      {
        managerId: '',
        managerName: ''
      }
    );
  }

  // =========================
  // TÓ FRISSÍTÉS
  // =========================
  async updateLake(
    lakeId: string,
    data: Partial<Lake>
  ): Promise<void> {

    const ref =
      doc(
        this.firestore,
        `lakes/${lakeId}`
      );

    await updateDoc(
      ref,
      data
    );
  }
}