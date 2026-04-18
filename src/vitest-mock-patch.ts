import { vi } from 'vitest';
import { of } from 'rxjs';

vi.mock('@angular/fire/firestore', async () => {
  return {
    Firestore: class {},

    collection: vi.fn((firestore: any, path: string) => {
      return { firestore, path, __type: 'collection' };
    }),

    collectionData: vi.fn(() => of([])),

    doc: vi.fn((firestore: any, path: string) => {
      return { firestore, path, __type: 'doc' };
    }),

    docData: vi.fn(() => of({}))
  };
});