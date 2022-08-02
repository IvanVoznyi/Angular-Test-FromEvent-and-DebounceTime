import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(password: string, email: string): Observable<any> {
    const body = {
      password,
      email
    }
    return this.http.post("fakeApi", body)
  }
}
