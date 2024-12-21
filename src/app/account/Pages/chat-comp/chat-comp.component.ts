import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-comp',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat-comp.component.html',
  styleUrls: ['./chat-comp.component.css']
})
export class ChatcompComponent implements OnInit {
  username: string | undefined;
  message: string = '';
  messages: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const name = prompt('Please enter your name');
    if (name && name.trim()) {
      this.username = name.trim();
      this.chatService.connect(this.username);
    } else {
      alert('A valid username is required to join the chat!');
    }

    this.chatService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const chatMessage = {
        sender: this.username,
        content: this.message.trim(),
        type: 'CHAT'
      };
      this.chatService.sendMessage(chatMessage);
      this.message = '';
    }
  }
}
