import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../common/header/header.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.scss']
})
export class AddDishFormComponent implements OnInit {
  hide = true;
  imageUrl: any = 'https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image.jpg'
  photo: any;
  post!: UntypedFormGroup;
  head:any="Add Dish"
  constructor(private toastr: ToastrService, 
    public dialogRef: MatDialogRef<HeaderComponent>,
     private formBuilder: UntypedFormBuilder,  @Inject(MAT_DIALOG_DATA) public feeds: {name: any},private service: UserService) { }



     currentUser: any;
  da: any
  ngOnInit(): void {

    //     (localStorage.getItem("currentUser"))?this.currentUser=JSON.parse(localStorage.getItem("currentUser")!):"";
    // (this.currentUser.photo)?this.imageUrl=this.service.imageUrl+this.currentUser.photo:""

    this.post = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      status: [true, [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

console.log(this.feeds.name);

if(this.feeds.name)
{
  this.head="Update Dish"
  this.post = this.formBuilder.group({
    name: [this.feeds.name.name, [Validators.required]],
    price: [this.feeds.name.price, [Validators.required]],
    status: [this.feeds.name.status, [Validators.required]],
    type: [this.feeds.name.type, [Validators.required]],
    description: [this.feeds.name.description, [Validators.required]],
  });
  this.imageUrl=this.feeds.name.photo[0].path
}





  }



  getErrorMessage() {

    return 'Enter Valid Details';
  }

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  fileUpload(event: any) {
    this.photo = event.target.files[0];
    console.log(event.target.files[0]);
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }


  }
  submitform() {
    const formData: any = new FormData();
    formData.append("name", this.post.value.name);
    if(this.photo)formData.append("photo", this.photo);
    formData.append("price", this.post.value.price);
    formData.append("status", this.post.value.status);
    formData.append("type", this.post.value.type);
    formData.append("description", this.post.value.description);
    
    
    if(this.feeds?.name){
    
      this.service.updateDish(this.feeds.name._id,formData).subscribe(data=>{
        console.log(data);})
      }
    else{
console.log("hello");

      this.service.postDish(formData).subscribe(data=>{
        console.log(data);})
      }

      this.service.getDish().subscribe(data=>{
        console.log(data);})


  this.service.sendMessage('addDish');

    this.dialogRef.close();
   


  }

}
