import { vi } from 'vitest';
import { of } from 'rxjs';

/**
 * 🔥 FIRESTORE MOCK – TELJES
 */
vi.mock('@angular/fire/firestore', async (importOriginal) => {
  const actual = (await importOriginal()) as any;

  // 👇 fake class-ek
  class FakeQuery {}
  class FakeDocRef {}

  return {
    ...actual,

    collection: vi.fn(() => new FakeQuery()),
    doc: vi.fn(() => new FakeDocRef()),

    collectionData: vi.fn(() => of([])),
    docData: vi.fn(() => of({})),

    addDoc: vi.fn(() => Promise.resolve({})),
    updateDoc: vi.fn(() => Promise.resolve()),
    deleteDoc: vi.fn(() => Promise.resolve()),

    query: vi.fn(() => new FakeQuery()),
    where: vi.fn(() => ({})),
    orderBy: vi.fn(() => ({})),
    limit: vi.fn(() => ({})),
    startAt: vi.fn(() => ({})),
    startAfter: vi.fn(() => ({})),
  };
});

/**
 * 🔥 AUTH MOCK
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

/**
 * 🔥 ALERT MOCK
 */
vi.spyOn(window, 'alert').mockImplementation(() => {});