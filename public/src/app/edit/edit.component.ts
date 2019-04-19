
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
pet: object;
error: any;

  constructor(private _httpService: HttpService, private _router:Router, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    this.findPet();
    this.error="";
    this.pet = {pet: {
      name: "",
      type: "",
      description: "",
      skillOne: "",
      skillTwo: "",
      skillThree: ""
    }};
    
  }

  findPet(){
    this._route.params.subscribe((params)=>{
      console.log("~The ID in the URL is:", params["id"])
      let observable = this._httpService.getOnePet(params["id"]);
      observable.subscribe((data:any)=>{
        this.pet = data;
        console.log("moo", this.pet);
      })
    })
  }

  editSubmit(){
    this._route.params.subscribe((params)=>{
      let observable = this._httpService.editPet(params['id'], this.pet);
      observable.subscribe((data:any) => {
        if(data.error){
          this.error = data.error
          console.log("/././././././././././././.")
          console.log("this is our error")
          console.log(this.error);
        }
        else{
          console.log("~Edit~");
          this._router.navigate(['/home']);
        }
      })
    })
  }
}
