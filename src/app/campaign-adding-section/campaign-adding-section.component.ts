import { Component } from '@angular/core';
import { FormDataServiceService } from '../form-data-service.service';

@Component({
  selector: 'campaign-adding-section',
  templateUrl: './campaign-adding-section.component.html',
  styleUrls: ['./campaign-adding-section.component.css'],
})
export class CampaignAddingSectionComponent {
  private subscription: any;

  showButton = true; //control showing button
  formDataToEdit: any; //holds Data from submitted form
  isEditMode: boolean = false; //control showing edit form

  toggleShowButton() {
    this.showButton = !this.showButton;
  }

  constructor(private formDataService: FormDataServiceService) {}

  ngOnInit() {
    this.subscription = this.formDataService.formDataToEdit$.subscribe(
      (data) => {
        if (data !== null) {
          this.showButton = false;
          this.formDataToEdit = { ...data };
          this.isEditMode = data && Object.keys(data).length > 0;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
