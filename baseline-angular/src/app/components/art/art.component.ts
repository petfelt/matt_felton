import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { ISubscription } from "rxjs/Subscription";
import {PhotoAlbumService} from '../../services/photo-album.service';
import {Photo} from '../../services/photo';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit {

  private photos: Observable<Photo[]>;
  private activeImage;
  private subscription: ISubscription;
  private subscription2: ISubscription;
  private listLocation;
  private listLength;

    constructor(
        private photoAlbum: PhotoAlbumService
    ) { }

    ngOnInit(): void {
        this.photos = this.photoAlbum.getArt();
        this.listLocation = 0;
        this.getListLength();
        this.updateListLocation(this.listLocation);
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
      this.subscription2.unsubscribe();
    }

    updateActiveImage(index): void {
      // console.log(index);
      this.activeImage = index;
      // console.log(this.photos);
      this.subscription.unsubscribe();
    }

    updateListLocation(newLocation): void {
      this.listLocation = newLocation;
      // console.log(this.listLocation);
      // this.subscription = this.photos.subscribe(
      //   x => console.log('This image: %s', x[this.listLocation]));
      this.subscription = this.photos.subscribe(
        x => this.updateActiveImage(x[this.listLocation]));
      // Then scroll to top of page.
      this.scrollToTop(400);
    }

    updateRight(): void {
      // Do checks to make it loop around.
      if(this.listLocation < this.listLength){
        this.listLocation++;
      } else {
        this.listLocation = 0;
      }
      this.subscription = this.photos.subscribe(
        x => this.updateActiveImage(x[this.listLocation]));
    }

    updateLeft(): void {
      // Do checks to make it loop around.
      if(this.listLocation > 0){
        this.listLocation--;
      } else {
        this.listLocation = this.listLength;
      }
      this.subscription = this.photos.subscribe(
        x => this.updateActiveImage(x[this.listLocation]));
    }

    getListLength(): void {
      this.subscription2 = this.photos.subscribe(
        x => this.returnListLength(x));
    }

    returnListLength(length): void {
      this.listLength = (length.length)-1;
      this.subscription2.unsubscribe();
    }
    scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval);
    },15);
}
}
