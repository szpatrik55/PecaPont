import { vi } from 'vitest';
import { of } from 'rxjs';

/**
 * 🔥 FIRESTORE MOCK – FIXED
 */
vi.mock('@angular/fire/firestore', async (importOriginal) => {
  const actual = (await importOriginal()) as any;

  return {
    ...actual,

    // ❗ NINCS FakeQuery / FakeDocRef
    collection: vi.fn(() => ({})),
    doc: vi.fn(() => ({})),

    // ✅ EZ A LÉNYEG
    collectionData: vi.fn(() => of([])),
    docData: vi.fn(() => of({})),

    // async műveletek
    addDoc: vi.fn(() => Promise.resolve({ id: '123' })),
    updateDoc: vi.fn(() => Promise.resolve()),
    deleteDoc: vi.fn(() => Promise.resolve()),

    // query builder-ek (nem kell típus!)
    query: vi.fn(() => ({})),
    where: vi.fn(() => ({})),
    orderBy: vi.fn(() => ({})),
    limit: vi.fn(() => ({})),
    startAt: vi.fn(() => ({})),
    startAfter: vi.fn(() => ({})),
  };
});

/**
 * 🔥 AUTH MOCK (ez oké volt)
 */
vi.mock('@angular/fire/auth', async (importOriginal) => {
  const actual = (await importOriginal()) as any;

  return {
    ...actual,
    Auth: class {},
    authState: vi.fn(() => of(null)),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  };
});

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({})),
  doc: vi.fn(() => ({})),
  getDoc: vi.fn(() => Promise.resolve({ data: () => ({}) })),
}));

/**
 * 🔥 ALERT MOCK
 */
vi.spyOn(window, 'alert').mockImplementation(() => {});