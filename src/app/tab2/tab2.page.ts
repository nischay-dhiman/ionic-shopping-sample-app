import { Component } from '@angular/core';
import * as Constants from '../../constants';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  order_token: any;
  cart_products_list: any;
  cart_details: any;
  constructor(public navCtrl: NavController){
  }

  ionViewDidEnter() {
    this.getCart();
  }

  getCart(){
    Constants.client.cart.show({'bearerToken': localStorage.bearerToken}, {'include': 'line_items'}).then(
      (data) => {
        if(data.isSuccess()){
          this.cart_details = data.success().data.attributes
          this.cart_products_list = data.success().included.filter(a => a.type == 'line_item')
        }
        else{
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
