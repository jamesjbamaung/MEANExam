import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private _http: HttpClient) {}

  getAllPets(){
    console.log("IN jhhgj")
    return this._http.get("/pets");
  }

  getOnePet(id:string){
    return this._http.get("/editPet/"+id);
  }

  addPet(newPet){
    console.log("IN SERVICE")
    return this._http.post('/pets', newPet);
  }

  editPet(id:string, editPet:object){
    return this._http.put(`/pets/${id}`, editPet);
  }

  deletePet(id){
    console.log("id from service.ts")
    console.log(id)
    return this._http.delete('/delete/' + id);
  }
  addLike(id, like:object){
    console.log("id from service.ts")
    console.log(id)
    return this._http.put('/like/' + id, like);
  }

}