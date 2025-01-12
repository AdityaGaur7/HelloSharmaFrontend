import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { AstrologerService } from '../../services/astrologer.service';
import { Astrologer } from '../../models/astrologer.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-astrocomp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './astrocomp.component.html',
  styleUrl: './astrocomp.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class AstrocompComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loading = false;
  error: string | null = null;
  formVisible: boolean = false;
  astrologers: Astrologer[] = [];
  selectedImage: File | null = null;
  isEditing: boolean = false;
  editAstrologerId: number | null = null;

  astroForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    expertise: new FormControl('', Validators.required),
    languages: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    orders: new FormControl(0, Validators.required),
    price: new FormControl('', Validators.required),
    rating: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(5),
    ]),
    status: new FormControl('active', Validators.required), // Default status
    imageUrl: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private astrologerService: AstrologerService,
    private router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.astroForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      expertise: ['', [Validators.required]],
      languages: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.min(0)]],
      orders: [0, [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      status: ['active', Validators.required],
      imageUrl: [''],
    });
  }

  ngOnInit(): void {
    this.loadAstrologers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAstrologers(): void {
    this.loading = true;
    this.error = null;

    this.astrologerService
      .getAllAstrologers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.astrologers = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        },
      });
  }

  async addOrUpdateAstrologer(): Promise<void> {
    if (this.astroForm.invalid) {
      this.markFormGroupTouched(this.astroForm);
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      let imageUrl = this.astroForm.get('imageUrl')?.value || '';

      if (this.selectedImage) {
        const imageRef = ref(
          storage,
          `astrologers/${Date.now()}_${this.selectedImage.name}`
        );
        await uploadBytes(imageRef, this.selectedImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      const astrologer: Astrologer = {
        id: this.astroForm.value.id ?? 0,
        firstName: this.astroForm.value.firstName ?? '',
        lastName: this.astroForm.value.lastName ?? '',
        expertise: this.astroForm.value.expertise ?? '',
        languages: this.astroForm.value.languages ?? '',
        experience: this.astroForm.value.experience ?? '',
        orders: this.astroForm.value.orders ?? 0,
        price: this.astroForm.value.price ?? '',
        rating: this.astroForm.value.rating ?? 0,
        status: this.astroForm.value.status ?? 'active',
        imageUrl: imageUrl,
      };

      if (this.isEditing && this.editAstrologerId) {
        this.astrologerService
          .updateAstrologer(this.editAstrologerId, astrologer)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.handleSuccess('Astrologer updated successfully');
            },
            error: (error) => {
              this.handleError(error);
            },
          });
      } else {
        this.astrologerService
          .addAstrologer(astrologer)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.handleSuccess('Astrologer added successfully');
            },
            error: (error) => {
              this.handleError(error);
            },
          });
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  deleteAstrologer(id: number): void {
    if (!confirm('Are you sure you want to delete this astrologer?')) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.astrologerService
      .deleteAstrologer(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.handleSuccess('Astrologer deleted successfully');
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  private handleSuccess(message: string): void {
    this.loading = false;
    this.error = null;
    alert(message); // Consider using a proper notification service
    this.loadAstrologers();
    this.resetForm();
  }

  private handleError(error: any): void {
    this.loading = false;
    this.error = error.message || 'An error occurred';
    console.error('Operation failed:', error);
  }

  private resetForm(): void {
    this.astroForm.reset({ status: 'active' });
    this.selectedImage = null;
    this.isEditing = false;
    this.editAstrologerId = null;
    this.formVisible = false;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.astroForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.astroForm.get(fieldName);
    if (!control) return '';

    if (control.hasError('required')) return `${fieldName} is required`;
    if (control.hasError('minlength'))
      return `${fieldName} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    if (control.hasError('min'))
      return `${fieldName} must be at least ${control.errors?.['min'].min}`;
    if (control.hasError('max'))
      return `${fieldName} must be at most ${control.errors?.['max'].max}`;

    return '';
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
    if (!this.formVisible) {
      this.resetForm();
    }
  }

  editAstrologer(id: number): void {
    const astrologer = this.astrologers.find((a) => a.id === id);
    if (astrologer) {
      this.isEditing = true;
      this.editAstrologerId = id;
      this.astroForm.patchValue(astrologer);
      this.formVisible = true;
    }
  }

  handleImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        this.error = 'Only JPEG, PNG, and GIF images are allowed';
        return;
      }
      if (file.size > maxSize) {
        this.error = 'Image size must be less than 2MB';
        return;
      }

      this.selectedImage = file;
      this.error = null;
    }
  }
}
