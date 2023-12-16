import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'imagr';
  userData = signal({});

  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser.subscribe((user) => {
      this.userData.set(user?.user_metadata?.['full_name']);
      console.log(this.userData());
    });
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/signin']);
  }
}
