import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SousCategorieModule } from 'src/app/models/sous-categorie/sous-categorie.module';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { SousCategoriesService } from 'src/app/services/sousCategories/sous-categories.service';

@Component({
  selector: 'app-sous-categorie',
  templateUrl: './sous-categorie.component.html',
  styleUrls: ['./sous-categorie.component.css']
})
export class SousCategorieComponent implements OnInit {

  listeSousCategories: any[] = []
  Souscategorie = new SousCategorieModule();
  public nom = new FormControl('',Validators.required)
  public categorie = new FormControl('')
  public lien = new FormControl('',Validators.required)
  modalRef?: BsModalRef;
  titre ="";
  titreModal ="";
  selectedSousCat = <SousCategorieModule>{};
  public showError = false;
  listeCategories: any[] = []
 
  constructor(private sousCategoriesService: SousCategoriesService,private categoriesService:CategoriesService,private toastr:ToastrService,private modalService:BsModalService) {
  
  }
  

 ngOnInit(): void {
   this.AfficherSouscategories();
   this.InsertSousCategorie();
   this.Affichercategories();
 }

 AfficherSouscategories() {
   this.sousCategoriesService.sousCategories().subscribe((souscategories: any) => {
     this.listeSousCategories = souscategories;
  });
}

InsertSousCategorie(){

 if(!this.nom.value || !this.categorie.value || !this.lien.value ){
   this.showError = true;
   return;
 }

 this.selectedSousCat.nom = this.nom.value;
 this.selectedSousCat.categorie_id = this.categorie.value;
 this.selectedSousCat.link = this.lien.value;


 if(this.titre == "Modifier"){
   this.sousCategoriesService.updateSousCategorie(this.selectedSousCat)
     .subscribe((categorie:any)=>{
       this. AfficherSouscategories();
       this.vider();
       this.showError = false;
       this.modalRef?.hide();
       this.showSuccess("La modification est réussite");
     });
 }else{
   this.sousCategoriesService.insertSousCategorie(this.selectedSousCat)
     .subscribe((souscategorie:any)=>{
       this.AfficherSouscategories();
       this.vider();
       this.showError = false;
       this.modalRef?.hide();
       this.showSuccess("L'insertion est réussite");
     });
 }
}

deleteSousCategorie(id:any){
  console.log(id);
 this.sousCategoriesService.deleteSousCategorie(id).subscribe((souscategorie:any)=>{
   this.AfficherSouscategories();
   this.showSuccess("La suppression est réussite");
 })
}
 
showSuccess(text:any){
 this.toastr.success(text);
}

openModal(template: TemplateRef<any>,souscategorie?:SousCategorieModule) {
 if(souscategorie){
   this.titreModal ="Modifier Sous-Catégorie";
   this.titre ="Modifier";
   this.selectedSousCat = souscategorie;
   this.nom.setValue(souscategorie.nom);
   this.categorie.setValue(souscategorie.categorie_id);
   this.lien.setValue(souscategorie.link);
   
 }
 else{
   this.titreModal="Ajouter Sous-Catégorie";
   this.titre ="Enregistrer";
   this.vider();
 }
   this.modalRef = this.modalService.show(template);
 }


 vider(){
   this.nom.reset();
   this.categorie.reset();
   this.lien.reset();

 }

 Affichercategories() {
  this.categoriesService.categories().subscribe((categories: any) => {
    this.listeCategories = categories;
    
 });
}
 
 
}

