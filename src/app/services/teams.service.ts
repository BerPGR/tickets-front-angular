import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class TeamsService {
    http = inject(HttpClient)
}
