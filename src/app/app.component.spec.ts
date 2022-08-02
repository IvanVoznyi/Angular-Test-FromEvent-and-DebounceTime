import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { RegisterService } from './services/register/register.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let registerService: RegisterService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    registerService = TestBed.inject(RegisterService);
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('fromEvent and debounceTime', () => {
    let spy: jasmine.Spy;
    let input: HTMLInputElement;

    beforeEach(() => {
      spy = spyOn(registerService, 'register').and.returnValue(of('done'));
      input = fixture.debugElement.query(By.css('input'))
        .nativeElement as HTMLInputElement;
    });

    it(`version 1'`, fakeAsync(() => {
      input.value = '123456';
      input.dispatchEvent(new Event('input'));

      tick(500);

      expect(spy).toHaveBeenCalledWith('123456', 'test@mail.com');
    }));

    it(`version 2'`, (done) => {
      input.value = '789101112';
      input.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalledWith('789101112', 'test@mail.com');
        done();
      });
    });
  });
});
