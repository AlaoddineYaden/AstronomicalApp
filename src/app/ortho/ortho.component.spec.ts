import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthoComponent } from './ortho.component';

describe('OrthoComponent', () => {
  let component: OrthoComponent;
  let fixture: ComponentFixture<OrthoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrthoComponent]
    });
    fixture = TestBed.createComponent(OrthoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
