import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-comp',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-comp.component.html',
  styleUrls: ['./chat-comp.component.css'],
})
export class ChatcompComponent implements OnInit, OnDestroy {
  currentUserId!: number;
  receiverId!: number;
  message: string = '';
  messages: any[] = [];
  receiverName: string = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.currentUserId = this.authService.getCurrentUserId();
  }

  ngOnInit(): void {
    // Get receiver ID from route parameters
    this.route.params.subscribe((params) => {
      this.receiverId = +params['id'];
      this.loadChatHistory();
      this.connectToChat();
    });

    // Subscribe to new messages
    this.chatService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  private connectToChat(): void {
    this.chatService.connect(this.currentUserId.toString());
  }

  private loadChatHistory(): void {
    this.chatService
      .getChatHistory(this.currentUserId, this.receiverId)
      .subscribe(
        (history) => {
          this.messages = history;
        },
        (error) => {
          console.error('Error loading chat history:', error);
        }
      );
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendPrivateMessage(
        this.currentUserId,
        this.receiverId,
        this.message.trim()
      );
      this.message = '';
    }
  }
}
