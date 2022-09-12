import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { UserService } from '../services/user.service';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";
import { Router } from '@angular/router';
import { HeaderComponent } from '../common/header/header.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';

// install Swiper modules
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class AddNewPostComponent implements OnInit {
  a = 1
  location = ""
  options = {
    types: [],
    componentRestrictions: { country: 'IN' }
  }
  showGrid = false
  cancelFileUpload = false
  cloudUpload = true
  preview = false
  addcomment = false
  multiples: any = [];
  temp = 0;
  uploadFile: any[] = [];
  imageUrl: any = 'https://images.unsplash.com/photo-1537824598505-99ee03483384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2NlbmVyeXxlbnwwfHwwfHw%3D&w=1000&q=80';
  emojiCaption = ""
  hide = true;
  time: number = 0;
  display: any;
  interval: any;
  constructor( private toastr: ToastrService,public dialogRef: MatDialogRef<HeaderComponent>, private cf: ChangeDetectorRef, private formBuilder: UntypedFormBuilder, private service: UserService, private router: Router) { }
  public file: any;
  imgBaseUrl = ""
  post!: UntypedFormGroup;
  urls: any[] = [];
  currentUser: any = [];
  savePost = false
  toggled: boolean = false;

  ngOnInit(): void {
    this.imgBaseUrl = this.service.imageUrl;
    (localStorage.getItem("currentUser")) ? this.currentUser = JSON.parse(localStorage.getItem("currentUser")!) : ""

    console.log(this.currentUser);

    this.post = this.formBuilder.group({
      caption: [this.emojiCaption, [Validators.required]],



    });
  }
  name = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);
  bio = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);
  gender = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);

  dob = new UntypedFormControl('', [Validators.required]);

  email = new UntypedFormControl('', [Validators.required, Validators.email]);


  password = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  phoneForm = new UntypedFormGroup({
    phone: new UntypedFormControl(undefined, [Validators.required])
  });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  open() {
    alert("hellow")
  }

  onSelectFile(event: any) {
    console.log(event.target.files);

    !(this.uploadFile.length) ? this.uploadFile = event.target.files : this.uploadFile = [...this.uploadFile, ...event.target.files]

    console.log(this.uploadFile);
    this.uploadFile = event.target.files

    this.file = event.target.files && event.target.files.length;
    if (this.file > 0) {
      let i: number = 0;
      for (const singlefile of event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.urls.push(singlefile);
        this.cf.detectChanges();
        i++;
        console.log(this.urls);
        reader.onload = (event) => {
          const url = (<FileReader>event.target).result as string;
          this.multiples.push({ path: url });
          this.cf.detectChanges();
        };
        console.log(this.multiples);
      }
    }
    else {
      alert("only 10 files are allowed!!")
    }

    this.showPreview()

    console.log(this.uploadFile[0]);

  }

  dec() {
    --this.temp
  }
  inc() {
    ++this.temp
  }
  del() {
    if (confirm("are you sure to remove this image")) {
      this.uploadFile.splice(this.temp, 1)
      this.multiples.splice(this.temp, 1)
    }

  }

  addPost() {


    const formData = new FormData();

    formData.append("caption", this.emojiCaption);
    formData.append("location", this.location);
    for (let i = 0; i < this.uploadFile.length; i++) {

      formData.append("photo", this.uploadFile[i]);
    }

    //   for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    console.log(formData.getAll('photo'));


    this.service.postFeed(formData).subscribe(data => {
      console.log(data);
      this.service.getOneUser(this.currentUser._id).subscribe(res => {
        console.log(res);

        this.currentUser = res;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      }, error => {
        // console.log(error);
        this.toastr.error('....', error.error.message);
      })
    }, error => {
      // console.log(error);
      this.toastr.error('....', error.error.message);
    })
    this.service.sendMessage("true")
    this.savePost = true
    this.addcomment = false

    this.startTimer()

  }

  home() {
    this.cloudUpload = true
    this.preview = false
    this.addcomment = false
    this.cancelFileUpload = false
    this.multiples = []
    this.uploadFile = []
  }
  showPreview() {
    this.cloudUpload = false
    this.preview = true
    this.addcomment = false
    this.cancelFileUpload = false
  }

  showaddcomment() {
    this.cloudUpload = false
    this.preview = false
    this.addcomment = true
  }
  cancelUpload() {
    this.cancelFileUpload = true
    this.preview = false
    this.addcomment = false
    this.cloudUpload = false

  }
  handleSelection(event: any) {
    console.log(event.char);
    // console.log(this.post.value);emojiCaption=""
    this.emojiCaption += event.emoji.native
  }


  startTimer() {
    console.log("=====>");
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      console.log(this.time);
      if (this.time == 3) {

        this.pauseTimer()


      }



    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.toastr.success("...","Feed Added Successfully!!")
    this.dialogRef.close();
  }

  cross(event: any) {
    // console.log(event.path[1].__ngContext__[23]);
    (confirm("Are You Sure to Remove This Image !!!")) ? this.multiples = this.multiples.filter((data: any) => JSON.stringify(data.path) != JSON.stringify(event.path[1].__ngContext__[23])) : ""


  }
  @ViewChild('myCarousel', { static: false }) myCarousel: any;
  @ViewChild('mainCarousel') mainCarousel: any;

  next() {
    this.myCarousel.next();


  }

  previous() {
    this.myCarousel.prev();
  }
  add(i: number) {
    console.log("a");

    console.log(this.mainCarousel.slideCounter + 1)
  }
  select(index: number) {
    this.a = 1

    if (index > this.multiples.length - 1) {
      return;
    }



    if (index > this.mainCarousel?.slideCounter) {
      this.a = index - this.mainCarousel?.slideCounter;
      setTimeout(()=>{
     this.mainCarousel.next()

      },100)
      



    }

    if (index < this.mainCarousel?.slideCounter) {
      this.a= this.mainCarousel?.slideCounter-index

      setTimeout(()=>{
        this.mainCarousel.prev();
   
         },100)
      
    }
  }


  @ViewChild("placesRef") placesRef: any;
  t1():number{
    return 1
  }

  handleAddressChange(e: any) {
    // console.log(e);

    // console.log(e.name+","+e.formatted_address)
    this.location = e.name + "," + e.formatted_address;
  }

}
