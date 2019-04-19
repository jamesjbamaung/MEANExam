import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newPet = {};
  response: any;
  error: string;

  constructor(private _httpService: HttpService,  
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.error="";
  }
  goHome() {
    this._router.navigate(['/home']);
  }
  addPet() {
    let observable = this._httpService.addPet(this.newPet);
    observable.subscribe((data:any) => {
      console.log('data', data)
      if(data.error){
        this.error = data.error
        console.log(data.error.errors);

      }
      else{
      console.log("~Create Author~");
      this.newPet = { 
        name: "",
        type: "",
        description: "",
        skillOne: "",
        skillTwo: "",
        skillThree: ""
       }
      this.goHome();
      }   
    })
  }
}
