import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

// Department components
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { DepartmentFormComponent } from './components/department/department-form/department-form.component';
import { DepartmentDetailsComponent } from './components/department/department-details/department-details.component';

// Contract components
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { ContractFormComponent } from './components/contract/contract-form/contract-form.component';
import { ContractDetailsComponent } from './components/contract/contract-details/contract-details.component';

// Team components
import { TeamListComponent } from './components/team/team-list/team-list.component';
import { TeamFormComponent } from './components/team/team-form/team-form.component';
import { TeamDetailsComponent } from './components/team/team-details/team-details.component';

// Formation components
import { FormationListComponent } from './components/formation/formation-list/formation-list.component';
import { FormationFormComponent } from './components/formation/formation-form/formation-form.component';
import { FormationDetailsComponent } from './components/formation/formation-details/formation-details.component';

// Resource components
import { ResourceListComponent } from './components/resource/resource-list/resource-list.component';
import { ResourceFormComponent } from './components/resource/resource-form/resource-form.component';
import { ResourceDetailsComponent } from './components/resource/resource-details/resource-details.component';

// University components
import { UniversityListComponent } from './components/university/university-list/university-list.component';
import { UniversityFormComponent } from './components/university/university-form/university-form.component';
import { UniversityDetailsComponent } from './components/university/university-details/university-details.component';

// Node service components
import { NodeServiceComponent } from './components/node-service/node-service.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  
  // Department routes
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/new', component: DepartmentFormComponent },
  { path: 'departments/edit/:id', component: DepartmentFormComponent },
  { path: 'departments/:id', component: DepartmentDetailsComponent },
  
  // Contract routes
  { path: 'contracts', component: ContractListComponent },
  { path: 'contracts/new', component: ContractFormComponent },
  { path: 'contracts/edit/:id', component: ContractFormComponent },
  { path: 'contracts/:id', component: ContractDetailsComponent },
  
  // Team routes
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/new', component: TeamFormComponent },
  { path: 'teams/edit/:id', component: TeamFormComponent },
  { path: 'teams/:id', component: TeamDetailsComponent },
  
  // Formation routes
  { path: 'formations', component: FormationListComponent },
  { path: 'formations/new', component: FormationFormComponent },
  { path: 'formations/edit/:id', component: FormationFormComponent },
  { path: 'formations/:id', component: FormationDetailsComponent },
  
  // Resource routes
  { path: 'resources', component: ResourceListComponent },
  { path: 'resources/new', component: ResourceFormComponent },
  { path: 'resources/edit/:id', component: ResourceFormComponent },
  { path: 'resources/:id', component: ResourceDetailsComponent },
  
  // University routes
  { path: 'universities', component: UniversityListComponent },
  { path: 'universities/new', component: UniversityFormComponent },
  { path: 'universities/edit/:id', component: UniversityFormComponent },
  { path: 'universities/:id', component: UniversityDetailsComponent },
  
  // Node service route
  { path: 'node-service', component: NodeServiceComponent },
  
  // Wildcard route for 404
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
