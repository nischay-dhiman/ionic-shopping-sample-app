import { Component } from '@angular/core';
import { getOrCreateCurrentQueries } from '@angular/core/src/render3/state';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'
import { NavController } from '@ionic/angular';

const client = makeClient({
  // host: 'http://172.20.10.3:5003'
  // host: 'http://172.16.11.79'
  host: 'http://localhost:5003'
})
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  order_token: any;
  cart_products_list: any;
  cart_details: any;
  constructor(public httpClient: HttpClient, public navCtrl: NavController){
  }

  ionViewDidEnter() {
    this.getCart();
  }

  getCart(){
    client.cart.show({'bearerToken': localStorage.bearerToken}, {'include': 'line_items'}).then(
      (data) => {
        if(data.isSuccess()){
          this.cart_details = data.success().data.attributes
          this.cart_products_list = data.success().included.filter(a => a.type == 'line_item')
        }
        else{
          // client.cart.create({ 'bearerToken': localStorage.bearerToken }).then(
          //   () => {}
          // )
          this.cart_details = {}
          this.cart_products_list = []
        }
      }
    )
  }

  checkout(){
    this.navCtrl.navigateForward('/shipping')
  }
}
