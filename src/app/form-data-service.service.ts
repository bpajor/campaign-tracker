import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WalletServiceService } from './wallet-service.service';

@Injectable({
  providedIn: 'root',
})
export class FormDataServiceService {
  private formData: any[] = [];
  private id: number = 0;

  private formDataToEditSubject = new BehaviorSubject<any>(null);
  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();
  formDataToEdit$ = this.formDataToEditSubject.asObservable();

  constructor(private walletService: WalletServiceService) {}

  setFormData(data: any) {
    this.formData.push(data);
    this.formDataSubject.next(this.formData); //inform subscribers about changes
  }

  deleteItem(id: number) {
    const objToDelete = this.formData.find((obj) => obj.id === id);
    this.walletService.setWalletAmount(-objToDelete.campaignFund); // increment wallet Amount if item is going to be removed
    this.formData = this.formData.filter((obj) => obj.id !== id);
    this.formDataSubject.next(this.formData); //inform subscribers about changes
  }

  editStatus(id: number, status: string) {
    const objToChange = this.formData.find((obj) => obj.id === id);
    if (status !== objToChange.status) {
      objToChange.status = status;
    }
    this.formDataSubject.next(this.formData); //inform subscribers about changes
  }

  getFormData() {
    return this.formData;
  }

  incrementId() {
    this.id += 1;
  }

  getId() {
    return this.id;
  }

  updateFormDataToEdit(data: any) {
    this.formDataToEditSubject.next(data);
  }

  editFormData(obj: any) {
    const objIndex = this.formData.findIndex((object) => object.id === obj.id);
    const diffAmount = obj.campaignFund - this.formData[objIndex].campaignFund;
    
    this.formData[objIndex] = obj;
    this.walletService.setWalletAmount(diffAmount);
    this.formDataSubject.next(this.formData); //inform subscribers about changes
  }
}
