import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private authService: AuthenticationService
  ) {
    authService.authState.subscribe(estado=>{
      if (estado) {
        router.navigate(['home']);
      }else{
        router.navigate(['login']);
      }
    });
  }
}
