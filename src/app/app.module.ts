import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { FormsModule } from '@angular/forms';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { NicknameComponent } from './components/nickname/nickname.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatBarComponent,
    ChatHistoryComponent,
    NicknameComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
