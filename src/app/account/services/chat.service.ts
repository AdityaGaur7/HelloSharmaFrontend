import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const BASE_URL = ['http://localhost:8080/api/v1/auth'];
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: Client;
  private messageSubject = new Subject<any>();
  private baseUrl = `${BASE_URL}/api/chat`;

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });
  }

  connect(userId: string): void {
    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');

      // Subscribe to private messages
      this.stompClient.subscribe(`/user/${userId}/chat/private`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        this.messageSubject.next(receivedMessage);
      });
    };

    this.stompClient.onStompError = (error) => {
      console.error('STOMP error:', error);
    };

    this.stompClient.activate();
  }

  sendPrivateMessage(
    senderId: number,
    receiverId: number,
    content: string
  ): void {
    if (this.stompClient.connected) {
      const message = {
        sender: { id: senderId },
        receiver: { id: receiverId },
        content: content,
        timestamp: new Date(),
      };

      this.stompClient.publish({
        destination: '/app/private-message',
        body: JSON.stringify(message),
      });
    }
  }

  getChatHistory(userId1: number, userId2: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/messages/${userId1}/${userId2}`
    );
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
