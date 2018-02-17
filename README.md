# matt_felton
A website built for my father using the MEAN stack and Cloudinary. Includes sections for his art, photography, music, & software. Also includes biography, news, and social media links. Currently a prototype. Soon to add new photo browsing features to include better mobile navigation.

### [Live Link.](http://www.matthewfelton.com/)

![Preview Of Photography Page](https://github.com/petfelt/matt_felton/blob/master/media/preview1.png)

## Code Snippet

Custom change of active image using subscriptions and a JSON list compiled through Cloudinary:
```javascript
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
```

## Built With

* [MEAN](http://mean.io/) - Stack used. Comprised of [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [Angular 4](https://angular.io/), & [NodeJS](https://nodejs.org/en/).
* [Angular-CLI](https://cli.angular.io/) - Template construction.
* [Cloudinary](https://cloudinary.com/) - Image hosting.
* [Cloudinary/angular-4.x](https://www.npmjs.com/package/@cloudinary/angular-4.x) - To connect to Cloudinary.

## Author

* **Peter Amin Felton** - [petfelt](https://github.com/petfelt).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments

* My Father - For consistent encouragement.
* [Traversy Media](http://traversymedia.com/) - Tutorial videos.
