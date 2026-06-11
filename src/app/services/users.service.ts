import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../class/users';

@Service()
export class UsersService {
    http = inject(HttpClient)

    getAll(): Observable<Users[]> {
        return this.http.get<Users[]>("http://localhost:8000/users")
    }
}
