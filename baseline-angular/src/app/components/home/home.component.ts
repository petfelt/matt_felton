import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { ISubscription } from "rxjs/Subscription";
import {PhotoAlbumService} from '../../services/photo-album.service';
import {Photo} from '../../services/photo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private photos: Observable<Photo[]>;
  private arts: Observable<Photo[]>;
  private photoImage = "http://res.cloudinary.com/petfelt/image/list/photo.json";
  private artImage = "http://res.cloudinary.com/petfelt/image/list/photo.json";
  // private photoImage = "http://res.cloudinary.com/petfelt/image/upload/art5_dcaiyg";
  // private artImage = "http://res.cloudinary.com/petfelt/image/upload/art1_s9novw";

  private subscription: ISubscription;
  private subscription2: ISubscription;

  constructor(
    private photoAlbum: PhotoAlbumService
  ) {}

  ngOnInit(): void {
    this.photos = this.photoAlbum.getPhotos();
    this.arts = this.photoAlbum.getArt();
    this.updatePhotoImage();
    this.updateArtImage();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  updatePhotoImage(): void {
    // console.log(index);
    this.subscription = this.photos.subscribe(
      x => (this.photoImage = "http://res.cloudinary.com/petfelt/image/upload/"+x[0].public_id));
    // console.log(this.photos);
  }

  updateArtImage(): void {
    // console.log(index);
    this.subscription2 = this.arts.subscribe(
      x => (this.artImage = "http://res.cloudinary.com/petfelt/image/upload/"+x[0].public_id));
    // console.log(this.photos);
  }

}
