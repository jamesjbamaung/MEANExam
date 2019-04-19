import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  thisPet = null;
  likeButton;
  numberOfLikes;
  error:any;

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) {}

  ngOnInit() {
    this.findPet()
    this.likeButton = true;
    this.numberOfLikes = this.thisPet.pet.likes
  }
  findPet(){
    this._route.params.subscribe((params)=>{
      console.log("~The ID in the URL is:", params["id"])
      let observable = this._httpService.getOnePet(params["id"]);
      observable.subscribe((data:any)=>{
        this.thisPet = data;
        console.log("moo", this.thisPet);
      })
    })
  }
  addLike(){
    this.likeButton = false;
    this._route.params.subscribe((params)=>{
      let observable = this._httpService.addLike(params['id'], this.thisPet);
      observable.subscribe((data:any) => {
        if(data.error){
          this.error = data.error
        }
        else{
          console.log("~Edit~");
        }
      })
    })
  }

  destroy(id){
    let observable = this._httpService.deletePet(id)
    observable.subscribe(
      (data) => {
        console.log("successful deletion", data)
      }
    )
    this._router.navigate(['/home']);
  }
  deletePet(id:string){
    console.log("got here")
    let observable = this._httpService.deletePet(id);
    observable.subscribe(data=>{
      console.log("~Deleting Author~")
    })
  }
}
