import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartilFiltroComponent } from './quartil-filtro.component';

describe('QuartilFiltroComponent', () => {
  let component: QuartilFiltroComponent;
  let fixture: ComponentFixture<QuartilFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuartilFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartilFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
