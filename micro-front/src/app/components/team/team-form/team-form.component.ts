import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team, Niveau } from '../../../models/team.model';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  teamForm: FormGroup;
  isEditMode = false;
  teamId!: number;
  loading = false;
  submitted = false;
  error = '';
  niveles = Object.values(Niveau);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) {
    this.teamForm = this.formBuilder.group({
      nomEquipe: ['', Validators.required],
      niveau: [Niveau.JUNIOR, Validators.required],
      nbMembres: [0, [Validators.required, Validators.min(0)]],
      ageMoyen: [0, [Validators.required, Validators.min(0)]],
      projetsLivres: [0, [Validators.required, Validators.min(0)]],
      prochaineEvolution: [false],
      detailEquipe: this.formBuilder.group({
        salle: [''],
        thematique: ['']
      })
    });
  }

  ngOnInit(): void {
    this.teamId = +this.route.snapshot.params['id'];
    this.isEditMode = !!this.teamId;

    if (this.isEditMode) {
      this.loading = true;
      this.teamService.getTeamById(this.teamId).subscribe({
        next: (team) => {
          this.teamForm.patchValue({
            nomEquipe: team.nomEquipe,
            niveau: team.niveau,
            nbMembres: team.nbMembres,
            ageMoyen: team.ageMoyen,
            projetsLivres: team.projetsLivres,
            prochaineEvolution: team.prochaineEvolution,
            detailEquipe: team.detailEquipe || { salle: '', thematique: '' }
          });
          this.loading = false;
        },
        error: (e) => {
          this.error = 'Failed to load team data. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  get f() { return this.teamForm.controls; }
  get detailEquipe() { return this.f['detailEquipe'] as FormGroup; }

  onSubmit(): void {
    this.submitted = true;

    if (this.teamForm.invalid) {
      return;
    }

    this.loading = true;
    const team: Team = this.teamForm.value;

    if (this.isEditMode) {
      this.teamService.updateTeam(this.teamId, team).subscribe({
        next: () => {
          this.router.navigate(['/teams']);
        },
        error: (e) => {
          this.error = 'Failed to update team. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    } else {
      this.teamService.createTeam(team).subscribe({
        next: () => {
          this.router.navigate(['/teams']);
        },
        error: (e) => {
          this.error = 'Failed to create team. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/teams']);
  }
}
