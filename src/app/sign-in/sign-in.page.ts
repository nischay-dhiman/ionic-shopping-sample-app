import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NavController } from '@ionic/angular';
import * as Constants from '../../constants';


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
    Constants.client.authentication.getToken(this.credentialsForm.value).then(
      (data) =>{
        let access_token = data.success().access_token
        localStorage.setItem('bearerToken', access_token)
        this.navCtrl.navigateRoot('/tabs');
      }
    )
  }

}
