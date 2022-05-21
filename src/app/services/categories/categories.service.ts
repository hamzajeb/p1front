import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieModule } from 'src/app/models/categorie/categorie.module';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl = "http://127.0.0.1:8000/api/"
  constructor(private http: HttpClient) {
    this.categories();
   
  }


  categories() {
    return this.http.get(this.baseUrl + "categorie");

  }
  getSouscategories() {
    return this.http.get(this.baseUrl + "getIndex");
  }

  insertCategorie(categorie:CategorieModule): Observable<CategorieModule>{
    return this.http.post<CategorieModule>(this.baseUrl + "categorie/",categorie);
  }

  deleteCategorie(id:any){
    return this.http.delete(this.baseUrl +"categorie/"+id);
  }

  updateCategorie(categorie:CategorieModule): Observable<CategorieModule>{
    return this.http.put<CategorieModule>(this.baseUrl +"categorie/"+categorie.id,categorie);
  }
  
 

}
