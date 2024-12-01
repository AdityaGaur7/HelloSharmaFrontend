import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormControl } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPhone,faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FontAwesomeModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  faPhone=faPhone
  faUser=faUser
  ProfileUrl=""
  chatForm: FormGroup;
  messages = [
    {
      text: "Hi! It's so nice to meet you. I'm excited to help guide you through the stars and provide insights on your life's journey. What's your birth date, time, and location?",
      isUser: false
    },
    {
      text: "Hi Madeline! My birth date is January 1, 1990.",
      isUser: true
    },
    {
      text: "Thanks! What about the time and location?",
      isUser: false
    }
  ];

  constructor(private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      newMessage: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  sendMessage() {
    if (this.chatForm.valid) {
      const newMessage = this.chatForm.get('newMessage')?.value;
      this.messages.push({ text: newMessage, isUser: true });
      this.chatForm.reset();

      // Simulate a bot response
      setTimeout(() => {
        this.messages.push({
          text: "Thank you for your response! Let me analyze that for you.",
          isUser: false
        });
      }, 1000);
    }
  }
}
