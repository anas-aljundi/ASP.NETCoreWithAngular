import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertfiyService } from 'src/app/_services/alertfiy.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private auth: AuthService, private userService: UserService, private alertify: AlertfiyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader()  {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.auth.decodedToken.nameid  + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          photoId: res.photoId,
          photoUrl: res.photoUrl,
          desciption: res.desciption,
          dateAdded: res.dateAdded,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.auth.changeMemberPhoto(photo.photoUrl);
          this.auth.currentUser.photoUrl = photo.photoUrl;
          localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
        }
      }
    };
  }

  setMain(photo: Photo)  {
    this.userService.setMainPhoto(this.auth.decodedToken.nameid, photo.photoId).subscribe(() =>  {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      /*this.getPhotoChange.emit(photo.photoUrl);*/
      this.auth.changeMemberPhoto(photo.photoUrl);
      this.auth.currentUser.photoUrl = photo.photoUrl;
      localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you need to delete this photo', () => {
      this.userService.deletePhoto(this.auth.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.photoId === id), 1);
        this.alertify.success('photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }

}
