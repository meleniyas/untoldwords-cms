import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageRowComponent } from './homepage-row.component';

describe('HomepageRowComponent', () => {
  let component: HomepageRowComponent;
  let fixture: ComponentFixture<HomepageRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
