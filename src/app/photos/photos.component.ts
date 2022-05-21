import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }


  images = [
    {
      imageSrc:"./assets/images/famille.jpg",
      imageAlt: 'nature1',
    },
    {
      imageSrc:
      "./assets/images/hommeFemme.jpg",
      imageAlt: 'nature2',
    },
    {
      imageSrc:
      "./assets/images/enfant.jpg",
      imageAlt: 'person1',
    },
    {
      imageSrc:
      "./assets/images/tous.jpg",
      imageAlt: 'person2',
    },
  ]

}
