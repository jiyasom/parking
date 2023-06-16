import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticate: boolean = false;
  constructor(private http: HttpClient) {}

  login(source:any) {
   

    return this.http.post(environment.base_api+'login', source).pipe(
      tap(() => {
        // Set the isAuthenticated flag to true upon successful login
        this.isAuthenticate = true;
      })
    );
  }


  register(source:any) {
   

    return this.http.post(environment.base_api+'register', source).pipe(
      tap(() => {
        // Set the isAuthenticated flag to true upon successful login
        this.isAuthenticate = true;
      })
    );
  }








  logout() {
    // Perform logout logic and reset the isAuthenticated flag
    this.isAuthenticate = false;
  }

  isAuthenticated_success() {
    return this.isAuthenticate=true;
  }

  isAuthenticated() {
    return this.isAuthenticate;
  }
}


