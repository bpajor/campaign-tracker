import { Component, OnInit } from '@angular/core';
import { WalletServiceService } from '../wallet-service.service';

@Component({
  selector: 'header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
})
export class HeaderComponentComponent implements OnInit {
  title = 'Campaigns tracker'; //title of the header

  //Variables which controls amount of wallet and its validity
  walletAmount: number = 0;
  walletError: boolean = false;

  //Subscriptions
  walletSubscription: any;
  errorSubscription: any;

  constructor(private walletService: WalletServiceService) {
    walletService.setWalletAmount(); //Render random wallet amount
  }

  ngOnInit() {
    this.walletSubscription = this.walletService.walletAmount$.subscribe(
      (amount) => {
        if (amount === null) {
          this.walletAmount = this.walletService.getWalletAmount(); //get default wallet amount if rendered once
          return;
        }
        this.walletAmount = amount; //set amount from wallet subscription
      }
    );

    this.errorSubscription = this.walletService.displayError$.subscribe(
      (error) => {
        if (error === null) {
          return;
        }
        if (error) {
          this.walletError = error;
          return;
        }
        this.walletError = error; //if not an error
      }
    );
  }

  ngOnDestroy() {
    if (this.walletSubscription) {
      this.walletSubscription.unsubscribe();
    }
  }
}
