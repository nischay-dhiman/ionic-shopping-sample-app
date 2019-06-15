import { Component } from '@angular/core';

import * as Constants from '../../constants';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  access_token: string;
  productsListResponse: any;
  productsList = [];
  responseListing = [];
  orderToken: any;
  constructor(public toastController: ToastController)
  {
    this.getProductsFromClient();
  }

  getProductsFromClient(){
    Constants.client.products.list({'include': 'images'}).then(
      (data) =>{
        this.productsListResponse = data.success();
        this.responseListing = data.success().data;

        if(this.responseListing.length > 0){
          for (var i = 0; i < this.responseListing.length; i++) {
              this.responseListing[i]['image'] = this.productsListResponse.included.filter(a => a.id === this.responseListing[i].relationships.images.data[0].id)[0].attributes.styles[3].url
            this.productsList.push(this.responseListing[i]);
          }
        }
      } 
    )
  }

  addToCart(product_id){
    Constants.client.cart.create({ 
      'bearerToken': localStorage.bearerToken 
    }).then(
      () => {
        Constants.client.cart.addItem(
          { 'bearerToken': localStorage.bearerToken }, 
          {
            'variant_id': product_id,
            'quantity': 1
          }
        ).then(
          (data) => {
            this.presentToast();
          }
        )
      }
    )
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Product Added to Cart',
      duration: 1000
    });
    toast.present();
  }

}
