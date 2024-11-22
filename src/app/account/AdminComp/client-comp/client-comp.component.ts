import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-client-comp',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './client-comp.component.html',
  styleUrl: './client-comp.component.css'
})
export class ClientCompComponent  implements OnInit{
  formVisible: boolean = false;
  products:any;
  selectedImage: File | null = null;

  constructor( private router: Router) { }

  ngOnInit(): void {
  
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }



 

  editProduct(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  productForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),
    stock: new FormControl(''),
    price: new FormControl(0),
    category: new FormControl(''),
    gender: new FormControl(''),
    image: new FormControl(''),
    link: new FormControl(''),
    sold: new FormControl(0)
  });

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
        alert('File size should be less than 200KB. Please choose a smaller file.');
        this.selectedImage = null; // Clear the selected image if it's too large
      } else {
        this.selectedImage = file; // Accept the image if it's valid
      }
    }
  }



  
  
}
