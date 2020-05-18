import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BikersPage } from './bikers.page';

describe('BikersPage', () => {
  let component: BikersPage;
  let fixture: ComponentFixture<BikersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BikersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
