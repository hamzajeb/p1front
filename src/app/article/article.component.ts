import { Produit } from './../models/produit.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SousCategoriesService } from '../services/sousCategories/sous-categories.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  id:any;
  test:any;
  sousCat: any
  listeProduit: any[] = []
  imageDirectorypath:any='http://127.0.0.1:8000/'
  constructor(private _Activatedroute:ActivatedRoute,private sousCategoriesService:SousCategoriesService  ) { 
    this.url=this.imageDirectorypath+this.listeProduit;
  }

  ngOnInit(): void {
    // let id=this._Activatedroute.snapshot.paramMap.get("id");
    // this.id=id
    // //  console.log(parseInt(this.id))
    this._Activatedroute.queryParams.subscribe(queryParams => {
    // let id=this._Activatedroute.snapshot.paramMap.get("id");
    // this.id=id
    });
    this._Activatedroute.params.subscribe(routeParams => {
        let id=this._Activatedroute.snapshot.paramMap.get("id");
    this.id=id
    this.test=true
    this.afficherProduits(this.id)
    });
    this.ratingArr=Array(5).fill(false);//initialiser
  }

  afficherProduits(id:any){
    this.sousCategoriesService.SousCategorieProduit(id).subscribe((souscategories: any) => {
      this.sousCat = souscategories;
      this.listeProduit=souscategories.produit;
      console.log(this.sousCat)
      console.log(this.listeProduit)
   });
  }

  rating=0;
  ratingArr:boolean[]=[];
  url:any;




  changImage(event:any,x:any){
    x.chrono_hour= event.target.src
    // this.url=event.target.src
    this.test=false
  }


  returnStar(i:number){
    if(this.rating>=i+1){
      return 'star';
    }else{
      return 'star_border';//icon rate empty
    }
  }

  onClick(i:number){
    this.rating=i+1;
  }

}
