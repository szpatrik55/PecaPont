import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { AsyncPipe, NgIf, NgFor, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { updatePassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

/* 🔥 EZ HIÁNYZOTT */
import {
  FISH_CATEGORIES,
  METHOD_OPTIONS,
  BAIT_OPTIONS,
  TIME_OPTIONS
} from '../../config/fogas-adatok';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);

  constructor(
    public auth: AuthService,
    private firebaseAuth: Auth,
    private firestore: Firestore,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  userSub!: Subscription;

  userData: any = null;
  myPosts: any[] = [];

  // ✏️ EDIT
  editingPost: any = null;
  editForm!: FormGroup;

  selectedFishList: string[] = [];

  // 🔥 CONFIG használat
  fishCategories = FISH_CATEGORIES;
  fishCategoryKeys = Object.keys(FISH_CATEGORIES);

  methodOptions = METHOD_OPTIONS;
  baitOptions = BAIT_OPTIONS;
  timeOptions = TIME_OPTIONS;

  async ngOnInit() {
    this.userSub = this.auth.user$.subscribe(async user => {
      if (!user) return;

      // 👤 USER
      const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
      if (userDoc.exists()) {
        this.userData = userDoc.data();
      }

      // 🐟 SAJÁT POSZTOK
      const colRef = collection(this.firestore, 'gallery');
      const q = query(colRef, where('uid', '==', user.uid));
      const snapshot = await getDocs(q);

      this.myPosts = snapshot.docs.map(d => ({
        id: d.id,
        ...(d.data() as any)
      }));

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }

  // 🗑️ DELETE
  async deletePost(id: string) {
    if (!confirm('Biztos törlöd?')) return;

    await deleteDoc(doc(this.firestore, 'gallery', id));
    this.myPosts = this.myPosts.filter(p => p.id !== id);
  }

  // ✏️ OPEN EDIT
  openEdit(post: any) {
    this.editingPost = post;

    this.editForm = this.fb.group({
      title: [post.title, [Validators.required, Validators.minLength(3)]],
      description: [post.description],
      water: [post.water, Validators.required],
      spot: [post.spot],
      fishGroup: [post.fishGroup, Validators.required],
      species: [post.species, Validators.required],
      weight: [post.weight],
      length: [post.length],
      bait: [post.bait],
      method: [post.method],
      timeOfDay: [post.timeOfDay],
      catchDate: [post.catchDate]
    });

    this.selectedFishList = this.fishCategories[post.fishGroup] || [];

    // 🔥 DINAMIKUS HALFaj
    this.editForm.get('fishGroup')?.valueChanges.subscribe(group => {
      this.selectedFishList = this.fishCategories[group] || [];
      this.editForm.get('species')?.setValue('');
    });
  }

  // ❌ CLOSE
  closeEdit() {
    this.editingPost = null;
  }

  // 💾 SAVE
  async saveEdit() {

    if (this.editForm.invalid) {

      this.editForm.markAllAsTouched();

      alert('Hiányos adatok!');

      return;
    }

    try {

      await updateDoc(
        doc(this.firestore, 'gallery', this.editingPost.id),
        {
          ...this.editForm.value,

          weight:
            this.editForm.value.weight || null,

          length:
            this.editForm.value.length || null
        }
      );

      const index =
        this.myPosts.findIndex(
          p => p.id === this.editingPost.id
        );

      if (index !== -1) {

        this.myPosts[index] = {

          ...this.myPosts[index],

          ...this.editForm.value
        };
      }

      // 🔥 MODAL BEZÁRÁS
      this.editingPost = null;

      // 🔥 FORM RESET
      this.editForm.reset();

      // 🔥 UI FRISSÍTÉS
      this.cdr.detectChanges();

      alert('Mentve!');

    } catch (error) {

      console.error(error);

      alert('Mentés sikertelen!');
    }
  }

  // 👤 USERNAME
  async updateName(name: string) {
    if (!name || name.length < 3) return;

    const user = this.firebaseAuth.currentUser;
    if (!user) return;

    await updateDoc(doc(this.firestore, 'users', user.uid), {
      username: name
    });

    this.userData.username = name;
  }

  // 🔐 PASSWORD
  async changePassword(password: string) {
    if (!password || password.length < 6) return;

    const user = this.firebaseAuth.currentUser;
    if (!user) return;

    await updatePassword(user, password);
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }
}