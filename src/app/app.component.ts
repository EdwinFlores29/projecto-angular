import {Component} from '@angular/core';
import { AngularFireAuth} from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buy-sell';

  constructor(
    public auth: AngularFireAuth,
              ) { }
  signInClicked(): void {
    const provider = new GoogleAuthProvider();
     this.auth.signInWithPopup(provider).then(result => {
       console.log('Usuario autenticado:', result.user);
     }).catch(error => {
       console.error('Error de autenticación:', error);
     });
   }
  signOutClicked(): void {
    this.auth.signOut();
  }

}


