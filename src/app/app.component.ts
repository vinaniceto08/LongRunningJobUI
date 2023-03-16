import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Convert Text into Base64 Format';
  text = '';
  encodedText = '';
  isEncoding = false;
 hubConnection: signalR.HubConnection;

  constructor(private http: HttpClient) {
    var url = 'https://localhost:32772/base64hub'
    console.log(url.toString());
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .build();
   
    this.hubConnection.on('ReceiveCharacter', (character: string) => {
      this.encodedText += character;
    });
  }

  onSubmit() {
    this.isEncoding = true;
    var url = 'https://localhost:32772/Base64Encoder?text=';
    this.http.post(url.toString(),{text: this.text})
      .subscribe(() => {
        this.isEncoding = false;
      });
  }

  onCancel() {
    this.http.post('https://localhost:32772/base64/cancel', {})
      .subscribe(() => {
        this.isEncoding = false;
      });
  }

  // ngOnInit() {
  //   this.hubConnection.start()
  //     .then(() => console.log('SignalR connection established.'))
  //     .catch((err) => console.error(err));
  // }
}
