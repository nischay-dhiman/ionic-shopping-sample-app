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
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  shippingForm: FormGroup;
  payment_methods: any;
  payment_method_id: string;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
  ) {
    client.checkout.paymentMethods({ 'bearerToken': localStorage.bearerToken }).then(
      (data) =>{
        this.payment_methods = data.success().data
      }
    )

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
            payment_method_id: [2] // or directly 2
          })
        ]),
      }),
      payment_source: this.formBuilder.group({
          2: this.formBuilder.group({
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
    client.checkout.orderUpdate({ 'bearerToken': localStorage.bearerToken }, orderDetails).then(
      (data) => {
        client.checkout.advance({ 'bearerToken': localStorage.bearerToken }, orderDetails).then(
          (data) => {
            client.checkout.complete({ 'bearerToken': localStorage.bearerToken}).then(
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