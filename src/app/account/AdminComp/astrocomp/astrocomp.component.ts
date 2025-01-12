import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { AstrologerService } from '../../services/astrologer.service';
import { Astrologer } from '../../models/astrologer.model';
import { trigger, transition, style, animate } from '@angular/animations';

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
export class AstrocompComponent {
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
    private astrologerService: AstrologerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAstrologers();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editAstrologerId = +params['id'];
        this.isEditing = true;
        this.loadProductData(this.editAstrologerId);
      }
    });
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
    if (!this.formVisible) {
      this.astroForm.reset();
      this.isEditing = false;
      this.editAstrologerId = null;
      this.selectedImage = null;
    }
  }

  getAstrologers(): void {
    this.astrologerService
      .getAllAstrologers()
      .subscribe((data: Astrologer[]) => {
        this.astrologers = data;
      });
  }

  deleteAstrologer(id: number): void {
    if (confirm('Are you sure you want to delete this astrologer?')) {
      this.astrologerService.deleteAstrologer(id).subscribe(() => {
        console.log('Astrologer deleted');
        this.getAstrologers(); // Refresh the product list after deletion
      });
    }
  }

  editAstrologer(id: number): void {
    this.isEditing = true;
    this.editAstrologerId = id;

    // Load astrologer data to populate the form
    this.astrologerService
      .getAstrologerById(id)
      .subscribe((astrologer: Astrologer) => {
        this.astroForm.patchValue({
          id: astrologer.id,
          firstName: astrologer.firstName,
          lastName: astrologer.lastName,
          expertise: astrologer.expertise,
          languages: astrologer.languages,
          experience: astrologer.experience,
          orders: astrologer.orders,
          price: astrologer.price,
          rating: astrologer.rating,
          status: astrologer.status,
          imageUrl: astrologer.imageUrl,
        });

        // If there's an image URL, clear out any previously selected image
        this.selectedImage = null;

        // Make the form visible for editing
        this.formVisible = true;
      });
  }

  loadProductData(id: number): void {
    this.astrologerService
      .getAstrologerById(id)
      .subscribe((astrologer: Astrologer) => {
        this.astroForm.patchValue(astrologer);
        this.selectedImage = null; // Reset image selection on edit
      });
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Allowed file types (only images)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      // Set the maximum allowed file size (e.g., 200KB = 200 * 1024 bytes)
      const maxSize = 200 * 1024; // 200KB

      if (!allowedTypes.includes(file.type)) {
        alert('Only image files (JPEG, PNG, GIF) are allowed.');
        this.selectedImage = null; // Clear the selected image if it's not an image
      } else if (file.size > maxSize) {
        alert(
          'File size should be less than 200KB. Please choose a smaller file.'
        );
        this.selectedImage = null; // Clear the selected image if it's too large
      } else {
        this.selectedImage = file; // Accept the image if it's valid
      }
    }
  }

  async addOrUpdateAstrologer() {
    let imageUrl = '';
    if (this.selectedImage) {
      const imageRef = ref(
        storage,
        `images/${Date.now()}_${this.selectedImage.name}`
      );
      try {
        await uploadBytes(imageRef, this.selectedImage);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error('Image upload error:', error);
      }
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
      status: this.astroForm.value.status ?? '',
      imageUrl: (imageUrl || this.astroForm.value.imageUrl) ?? '', // Use uploaded image URL or existing URL
    };

    if (this.isEditing && this.editAstrologerId) {
      this.astrologerService
        .updateAstrologer(this.editAstrologerId, astrologer)
        .subscribe((result) => {
          console.log('Astrologer updated:', result);
          alert('Astrologer updated successfully');
          this.getAstrologers();
          this.astroForm.reset();
          this.isEditing = false;
        });
    } else {
      this.astrologerService.addAstrologer(astrologer).subscribe((result) => {
        console.log('Astrologer added:', result);
        alert('Astrologer added successfully');
        this.getAstrologers();
        this.astroForm.reset();
      });
    }
    this.selectedImage = null;
  }
}
