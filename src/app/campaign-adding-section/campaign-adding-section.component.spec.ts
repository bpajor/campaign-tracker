import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAddingSectionComponent } from './campaign-adding-section.component';

describe('CampaignAddingSectionComponent', () => {
  let component: CampaignAddingSectionComponent;
  let fixture: ComponentFixture<CampaignAddingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignAddingSectionComponent]
    });
    fixture = TestBed.createComponent(CampaignAddingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
