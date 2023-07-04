import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletServiceService {
  private walletAmount: number = 0;
  private displayError: boolean = false;

  private walletAmountSubject = new BehaviorSubject<any>(null);
  private displayErrorSubject = new BehaviorSubject<any>(null);

  walletAmount$ = this.walletAmountSubject.asObservable();
  displayError$ = this.displayErrorSubject.asObservable();

  constructor() {}

  setError() {
    this.displayError = true;
    this.displayErrorSubject.next(this.displayError);
    
    //Set 2 s time for error animation
    setTimeout(() => {
      this.displayError = false;
      this.displayErrorSubject.next(this.displayError);
    }, 2000);
  }

  getError() {
    return this.displayError;
  }

  setWalletAmount(amount?: number) {
    //if amount exists incremenct or decrement wallet Amount
    if (amount) {
      this.walletAmount -= amount;
      this.walletAmountSubject.next(this.walletAmount);
      return;
    }

    //else just render random walletAmount
    this.walletAmount = parseFloat((Math.random() * 100000).toFixed(2));
  }

  getWalletAmount() {
    return this.walletAmount;
  }
}
