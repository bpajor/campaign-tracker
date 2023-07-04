import { Component } from '@angular/core';
import { FormDataServiceService } from '../form-data-service.service';

@Component({
  selector: 'list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.css'],
})
export class ListSectionComponent {
  subscription: any;
  elements: any[] = [];

  constructor(private formDataService: FormDataServiceService) {}

  ngOnInit() {
    this.subscription = this.formDataService.formData$.subscribe((data) => {
      if (data !== null) {
        this.elements = data;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onItemDelete(id: number) {
    this.formDataService.deleteItem(id);
  }

  onStatusChange(id: number, status: string) {
    this.formDataService.editStatus(id, status);
  }

  onItemUpdate(id: number) {
    const formData = this.formDataService.getFormData();
    const formDataToEdit = formData.find((obj) => obj.id === id);
    this.formDataService.updateFormDataToEdit(formDataToEdit);
  }
}
