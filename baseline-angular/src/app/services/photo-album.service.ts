import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Photo} from './photo';
import {Cloudinary} from '@cloudinary/angular-4.x';

@Injectable()
export class PhotoAlbumService {

  constructor(private http: Http, private cloudinary: Cloudinary) {
    }

    getPhotos(): Observable<Photo[]> {
        // instead of maintaining the list of images, we rely on the 'photo' tag
        // and simply retrieve a list of all images with that tag.
        let url = this.cloudinary.url('photo', {
            format: 'json',
            type: 'list',
            // cache bust (lists are cached by the CDN for 1 minute)
            // *************************************************************************
            // Note that this is practice is DISCOURAGED in production code and is here
            // for demonstration purposes only
            // *************************************************************************
            version: Math.ceil(new Date().getTime() / 1000)
        });

        return this.http
            .get(url)
            .map((r: Response) => r.json().resources as Photo[]);
    }

    getArt(): Observable<Photo[]> {
        // instead of maintaining the list of images, we rely on the 'art' tag
        // and simply retrieve a list of all images with that tag.
        let url = this.cloudinary.url('art', {
            format: 'json',
            type: 'list',
            // cache bust (lists are cached by the CDN for 1 minute)
            // *************************************************************************
            // Note that this is practice is DISCOURAGED in production code and is here
            // for demonstration purposes only
            // *************************************************************************
            version: Math.ceil(new Date().getTime() / 1000)
        });

        return this.http
            .get(url)
            .map((r: Response) => r.json().resources as Photo[]);
    }
}
