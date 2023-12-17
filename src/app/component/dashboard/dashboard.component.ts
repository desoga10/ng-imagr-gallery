import { Component, effect, inject, signal } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { AuthService } from '../../service/auth.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  avatarData!: any;
  message = signal('');
  photoErrorMessage = signal('');
  userId = signal('');
  imageData = signal([]);
  getModalImage = signal('');
  urlCDN = signal(
    'https://frhovajmfloriucwnrsu.supabase.co/storage/v1/object/public/photos/'
  );

  getSelectedPhotoFile() {
    console.log(this.userId());
    this.galleryService
      .download('photos', this.userId() + '/')
      .then((data: any) => {
        this.imageData.set(data?.data);
        console.log(this.imageData());
      });
  }

  constructor() {
    effect(
      () => {
        this.authService.currentUser.subscribe((user) => {
          this.userId.set(user?.id || '');
          this.getSelectedPhotoFile();
        });
      },
      { allowSignalWrites: true }
    );
  }

  galleryService = inject(GalleryService);
  authService = inject(AuthService);

  uploadPhoto(event: Event) {
    const input = event.target as HTMLInputElement;

    console.log(input.files);

    if (!input.files || input.files.length == 0) {
      this.message.set("Photo Doesn't exist");
      console.log(this.message());
      return;
    }

    const file: File = input.files[0];
    const id: string = uuid();
    console.log(this.userId());
    console.log(id);

    this.galleryService
      .upload('photos', this.userId() + '/' + id, file)
      .then((data) => {
        if (data.error) {
          this.photoErrorMessage.set(
            `${data.error.message}, please upload a new photo`
          );
          console.log(this.photoErrorMessage());
        } else {
          console.log(data);
          this.getSelectedPhotoFile();
        }
      });
  }

  modalImage(image: string) {
    this.getModalImage.set(image);
    console.log(this.getModalImage());
  }
}
