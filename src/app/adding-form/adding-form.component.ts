import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormDataServiceService } from '../form-data-service.service';
import { CampaignAddingSectionComponent } from '../campaign-adding-section/campaign-adding-section.component';
import { ListSectionComponent } from '../list-section/list-section.component';
import { WalletServiceService } from '../wallet-service.service';
import FormObject from '../helpers/campaign-interface';
import { keywordsList, towns_array } from '../helpers/form-constans';

@Component({
  selector: 'adding-form',
  templateUrl: './adding-form.component.html',
  styleUrls: ['./adding-form.component.css'],
})
export class AddingFormComponent implements OnInit {
  formSubmitted = false;
  isEditMode: boolean = false;
  @Input() formDataToEdit?: FormObject;

  campaignForm: FormGroup = new FormGroup({});

  towns = towns_array;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataServiceService,
    private parent: CampaignAddingSectionComponent,
    private listSection: ListSectionComponent,
    private walletService: WalletServiceService
  ) {}

  ngOnInit(): void {
    this.campaignForm = this.fb.group({
      campaignName: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: [null, [Validators.required, Validators.min(1)]],
      campaignFund: [null, Validators.required],
      status: ['on', Validators.required],
      town: [null],
      radius: [null, Validators.required],
    });

    if (this.formDataToEdit !== undefined) {
      this.isEditMode = true;

      this.campaignForm.patchValue({
        campaignName: this.formDataToEdit.campaignName,
        keywords: this.formDataToEdit.keywords,
        bidAmount: this.formDataToEdit.bidAmount,
        campaignFund: this.formDataToEdit.campaignFund,
        status: this.formDataToEdit.status,
        town: this.formDataToEdit.town,
        radius: this.formDataToEdit.radius,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formDataToEdit'] && changes['formDataToEdit'].currentValue) {
      this.isEditMode = true;
      this.campaignForm.patchValue({
        campaignName: changes['formDataToEdit'].currentValue.campaignName,
        keywords: changes['formDataToEdit'].currentValue.keywords,
        bidAmount: changes['formDataToEdit'].currentValue.bidAmount,
        campaignFund: changes['formDataToEdit'].currentValue.campaignFund,
        status: changes['formDataToEdit'].currentValue.status,
        town: changes['formDataToEdit'].currentValue.town,
        radius: changes['formDataToEdit'].currentValue.radius,
      });
    }
  }

  searchKeywords = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : keywordsList
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  onSubmit() {
    this.formSubmitted = true;
    let campaignData = this.campaignForm.value;

    if (this.campaignForm.valid) {
      if (
        this.walletService.getWalletAmount() - campaignData.campaignFund <
        0
      ) {
        this.walletService.setError(); //set error to header wallet amount if campaignFund makes wallet negative
        return;
      }

      if (this.isEditMode) {
        campaignData = { ...campaignData, id: this.formDataToEdit?.id }; //if in edit mode, assign previous id value
        this.formDataService.editFormData(campaignData);
        this.parent.formDataToEdit = undefined;
      } else {
        this.formDataService.incrementId(); //increment id to get it unique
        campaignData = {
          ...campaignData,
          id: this.formDataService.getId(),  //asign unique id
        };
        this.formDataService.setFormData(campaignData);
        this.walletService.setWalletAmount(campaignData.campaignFund);
      }
      this.parent.toggleShowButton();
      this.parent.isEditMode = false;
    }
  }
}
