import { vi } from 'vitest';
import { of } from 'rxjs';
import './vitest-mock-patch';

vi.mock('@angular/fire/firestore', async () => {
const actual = await vi.importActual<any>('@angular/fire/firestore');

return {
...actual,
collection: vi.fn(() => ({})),
collectionData: vi.fn(() => of([])),
doc: vi.fn(() => ({})),
getDoc: vi.fn(() => Promise.resolve({ exists: () => true }))
};
});
