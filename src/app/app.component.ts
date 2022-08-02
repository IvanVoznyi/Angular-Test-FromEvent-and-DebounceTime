import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map, switchMap } from 'rxjs';
import { RegisterService } from './services/register/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('password', { static: true })
  password: ElementRef<HTMLInputElement> | null = null;

  constructor(private registerService: RegisterService) {}

  ngAfterViewInit(): void {
    if (this.password) {
      fromEvent(this.password.nativeElement, 'input')
        .pipe(
          debounceTime(500),
          map((event) => event.target as HTMLInputElement),
          switchMap((password) =>
            this.registerService.register(password.value, 'test@mail.com')
          )
        )
        .subscribe(() => {
          //TODO some action
        });
    }
  }
}
