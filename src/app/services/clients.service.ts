import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Clients } from '../class/clients';
import { Observable } from 'rxjs';
import apiUrl from '../utils/apiUrl';

@Service()
export class ClientsService {
    http = inject(HttpClient)

    getAll(): Observable<Clients[]> {
        return this.http.get<Clients[]>(apiUrl + "/clients")
    }
}
