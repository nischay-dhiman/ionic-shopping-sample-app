import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'
import { NavController } from '@ionic/angular';

const client = makeClient({
  // host: 'http://localhost:5003'
  // host: 'http://172.16.11.79:5003'
  host: 'http://localhost:5003'
  // host: 'http://172.20.10.3:5003'
})

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  credentialsForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
  ) {
    this.credentialsForm = this.formBuilder.group({
      username: ['spree@example.com'],
      password: ['test1234']
    });
   }

  ngOnInit() {
  }

  onSignIn() {
    client.authentication.getToken(this.credentialsForm.value).then(
      (data) =>{
        let access_token = data.success().access_token
        localStorage.setItem('bearerToken', access_token)
        this.navCtrl.navigateRoot('/tabs');
      }
    )
  }

}
