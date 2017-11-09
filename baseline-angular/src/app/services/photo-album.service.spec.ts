import { TestBed, inject } from '@angular/core/testing';

import { PhotoAlbumService } from './photo-album.service';

describe('PhotoAlbumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoAlbumService]
    });
  });

  it('should ...', inject([PhotoAlbumService], (service: PhotoAlbumService) => {
    expect(service).toBeTruthy();
  }));
});
