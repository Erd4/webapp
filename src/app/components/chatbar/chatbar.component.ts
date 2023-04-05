import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbar',
  templateUrl: './chatbar.component.html',
  styleUrls: ['./chatbar.component.css']
})
export class ChatbarComponent {

  public chatMessage= "";
  
  public addMessage(message: string):void {
    console.log(message);
    alert(message);

    this.chatMessage = "";
  }
}
