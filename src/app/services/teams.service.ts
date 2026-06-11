import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../class/team';

@Service()
export class TeamsService {
    http = inject(HttpClient)

    fetchTeams(): Observable<Team[]> {
        return this.http.get<Team[]>("http://localhost:8000/teams")
    }
}
