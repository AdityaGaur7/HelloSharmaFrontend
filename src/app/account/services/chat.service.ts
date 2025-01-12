import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: Client;
  private messageSubject = new Subject<any>();

  constructor() {
    // Initialize Stomp Client
    this.stompClient = new Client({
      webSocketFactory: () =>
        new SockJS('http://localhost:8080/chat-websocket-native'),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  }

  connect(username: string): void {
    this.stompClient.onConnect = () => {
      console.log('WebSocket connected');

      this.stompClient.subscribe('/topic/public', (message: IMessage) => {
        this.messageSubject.next(JSON.parse(message.body));
      });

      this.stompClient.publish({
        destination: '/app/chat.addUser',
        body: JSON.stringify({ sender: username, type: 'JOIN' }),
      });
    };

    this.stompClient.onStompError = (error) => {
      console.error('STOMP error:', error);
    };

    this.stompClient.activate();
  }

  sendMessage(chatMessage: any): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.error('Unable to send message: WebSocket is not connected.');
    }
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
