import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private httpClient:HttpClient) { }
  ajouterProduit(produit:any){
    const headres=new HttpHeaders();
    return this.httpClient.post('http://127.0.0.1:8000/api/produits',produit,{
      headers:headres
    });
  }

  updateProduit(id:any,data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/modifierProduit/'+id,data)
  }

  listeProduit(){
    return this.httpClient.get('http://127.0.0.1:8000/api/produits');
  }

  deleteProduit(id:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/produits/'+id);

  }
}
