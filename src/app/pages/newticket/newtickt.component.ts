import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../class/team';

@Component({
  selector: 'app-newtickt.component',
  imports: [],
  templateUrl: './newticket.component.html',
  styleUrl: './newtickt.component.css',
})
export class NewTicketComponent implements OnInit {
  teams: Team[] = []
  
  constructor(private tService: TeamsService) {}

  ngOnInit(): void {
    this.tService.fetchTeams().subscribe({
      next: (valor) => {
        this.teams = [...valor]
      },
      error: erro => console.log(erro)
    })
  }


}
