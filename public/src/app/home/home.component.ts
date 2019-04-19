import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllPets();
  }

  pets:any ;

  getAllPets(){
    let observable = this._httpService.getAllPets();
    observable.subscribe(data => { 
      console.log("~Loading All Authors~", data)
      this.pets = data["pets"]
      console.log(this.pets)
    });
  }

  deletePet(id:string){
    console.log("got here")
    let observable = this._httpService.deletePet(id);
    observable.subscribe(data=>{
      console.log("~Deleting Author~")
      this.getAllPets();
    })
  }

}