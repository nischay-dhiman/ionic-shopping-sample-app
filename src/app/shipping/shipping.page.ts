import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NavController } from '@ionic/angular';

import * as Constants from '../../constants';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  shippingForm: FormGroup;
  payment_methods: any;
  payment_method_id = 2;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
  ) {
    
    this.shippingForm = this.formBuilder.group({
      order: this.formBuilder.group({
        email: ["nischay.dhiman@gmail.com"],
        ship_address_attributes: this.formBuilder.group({
          firstname: ["John"],
          lastname: ["Snow"],
          address1: ["7735 Old Georgetown Road"],
          address2: ["2nd Floor"],
          city: ["Bethesda"],
          phone: ["3014445002"],
          zipcode: ["20814"],
          state_name: ["MD"],
          country_iso: ["US"]
        }),
        payments_attributes: this.formBuilder.array([
          this.formBuilder.group({
            payment_method_id: this.payment_method_id
          })
        ]),
      }),
      payment_source: this.formBuilder.group({
        [this.payment_method_id] : this.formBuilder.group({
          number: ["4111111111111111"],
          month: ["01"],
          year: ["2024"],
          verification_value: ["123"],
          name: ["John Doe"]
        })
      })
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    let orderDetails = this.shippingForm.value
    Constants.client.checkout.orderUpdate({ 'bearerToken': localStorage.bearerToken }, orderDetails).then(
      (data) => {
        Constants.client.checkout.advance({ 'bearerToken': localStorage.bearerToken }, orderDetails).then(
          (data) => {
            Constants.client.checkout.complete({ 'bearerToken': localStorage.bearerToken}).then(
              () => 
              {
                console.log('Order Placed Successfully')
                this.navCtrl.navigateRoot('/tabs/tab3')
              }
            )
          }
        )
      }
    )
  }

  

}