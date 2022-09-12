import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../common/header/header.component';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  hide = true;
  imageUrl:any='https://as2.ftcdn.net/v2/jpg/03/40/12/49/1000_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'
  photo:any;
  post!:UntypedFormGroup;
  constructor(private toastr: ToastrService,public dialogRef: MatDialogRef<HeaderComponent>,private formBuilder:UntypedFormBuilder,private service:UserService) { }
currentUser:any;
da:any
  ngOnInit(): void {

    (localStorage.getItem("currentUser"))?this.currentUser=JSON.parse(localStorage.getItem("currentUser")!):"";
    if(this.currentUser.photo) this.imageUrl=this.service.imageUrl+this.currentUser.photo;

    this.post = this.formBuilder.group({
      name :['', [Validators.required]],
      bio :['', [Validators.required]],
      gender:['', [Validators.required]],

      dob:['', []],
      address:['', [Validators.required]],

        email :['', [Validators.required,Validators.email]],

        mobile :['', [Validators.required,Validators.minLength(6)]],




    });

    // console.log(this.da.value);
    // this.da.value=
    console.log();

    this.post.patchValue(this.currentUser)
    this.da= new UntypedFormControl(new Date(this.currentUser.dob));




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
  fileUpload(event:any){
    this.photo=event.target.files[0];
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
  submitform(){
    console.log(this.photo)


    console.log(this.post.value,this.photo)

    const formData:any=new FormData();
    let a=[];
    a=this.post.value.name.split(" ")

    formData.append("firstName", a[0]);
    formData.append("lastName", a[1]);
    formData.append("email", this.post.value.email);
    formData.append("mobile", this.post.value.mobile.number);
    formData.append("photo", this.photo);
    formData.append("bio", this.post.value.bio);
    formData.append("dob",  this.da.value);
    formData.append("gender", this.post.value.gender);
    formData.append("address", this.post.value.address);



    this.service.updateUserWithPic(this.currentUser._id,formData).subscribe(data=>{
      console.log(data);

      this.service.getOneUser(data._id).subscribe(res=>{
        console.log(res);
        localStorage.setItem('currentUser',JSON.stringify(res));
        this.toastr.success("Profile Updated Successfully!!")
        this.service.sendMessage("true");
            }, error => {
              // console.log(error);
              this.toastr.error('....', error.error.message);
            })

    }, error => {
      // console.log(error);
      this.toastr.error('....', error.error.message);
    })




    this.dialogRef.close();
// window.location.reload()


  }

}
