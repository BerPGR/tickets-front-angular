import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../class/team';
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { SelectModule } from 'primeng/select'
import { FormsModule } from "@angular/forms"
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel'

@Component({
  selector: 'app-newtickt.component',
  imports: [CardModule, ButtonModule, FloatLabelModule, FormsModule, CommonModule, SelectModule],
  templateUrl: './newticket.component.html',
  styleUrl: './newtickt.component.css',
})
export class NewTicketComponent implements OnInit {
  teams: Team[] = []
  selectedTeam = null 
  
  constructor(private tService: TeamsService) {}

  ngOnInit(): void {
    this.tService.fetchTeams().subscribe({
      next: (valor) => {
        this.teams = [...valor]
      },
      error: erro => console.log(erro)
    })
  }

  createTicket() {
    console.log(this.selectedTeam)
  }

}
