import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Clients } from '../class/clients';
import { Observable } from 'rxjs';

@Service()
export class ClientsService {
    http = inject(HttpClient)

    getAll(): Observable<Clients[]> {
        return this.http.get<Clients[]>("http://localhost:8000/clients")
    }
}
