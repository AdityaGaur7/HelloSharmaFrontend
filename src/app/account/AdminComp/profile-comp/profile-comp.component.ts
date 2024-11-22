import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-comp',
  standalone: true,
  imports: [],
  templateUrl: './profile-comp.component.html',
  styleUrl: './profile-comp.component.css'
})
export class ProfileCompComponent {
  public data: any = null;
  user :any;

  constructor() {   
    try {
      this.data =localStorage.getItem('userData');
      this.data = JSON.parse(this.data)
     this.user = this.data;
      console.log(this.user);
      
    } catch (e) {
      console.error('Local storage is not accessible:', e);
      this.data = null;
    }
  
}

  ngOnInit(): void {
  }
}
