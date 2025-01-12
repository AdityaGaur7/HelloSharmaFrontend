import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chat-history-container">
      <div class="chat-list">
        <div *ngFor="let chat of chatHistory" class="chat-item">
          <div class="chat-user">
            <img
              [src]="chat.userImage || 'assets/default-avatar.png'"
              alt="User"
              class="user-avatar"
            />
            <div class="chat-info">
              <h5>{{ chat.userName }}</h5>
              <p class="text-muted">{{ chat.lastMessage }}</p>
            </div>
          </div>
          <div class="chat-meta">
            <span class="chat-time">{{
              chat.timestamp | date : 'shortTime'
            }}</span>
            <span class="chat-status" [class.online]="chat.isOnline"></span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .chat-history-container {
        padding: 1rem;
      }
      .chat-item {
        background: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s;
      }
      .chat-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .chat-user {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
      }
      .chat-meta {
        text-align: right;
      }
      .chat-status {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #cbd5e0;
        margin-left: 0.5rem;
      }
      .chat-status.online {
        background: #48bb78;
      }
    `,
  ],
})
export class ChatHistoryComponent {
  chatHistory = [
    {
      id: 1,
      userName: 'John Doe',
      userImage: 'assets/default-avatar.png',
      lastMessage: 'Thank you for the reading!',
      timestamp: new Date(),
      isOnline: true,
    },
    // Add more chat history items
  ];
}
