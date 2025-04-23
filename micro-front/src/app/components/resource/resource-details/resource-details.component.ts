import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resource } from '../../../models/resource.model';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss']
})
export class ResourceDetailsComponent implements OnInit {
  resource!: Resource;
  loading = false;
  error = '';
  resourceId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.resourceId = +this.route.snapshot.params['id'];
    this.loadResource();
  }

  loadResource(): void {
    this.loading = true;
    this.resourceService.getResourceById(this.resourceId).subscribe({
      next: (data) => {
        this.resource = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load resource details. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  editResource(): void {
    this.router.navigate(['/resources/edit', this.resourceId]);
  }

  deleteResource(): void {
    if (confirm('Are you sure you want to delete this resource?')) {
      this.resourceService.deleteResource(this.resourceId).subscribe({
        next: () => {
          this.router.navigate(['/resources']);
        },
        error: (e) => {
          this.error = 'Failed to delete resource. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/resources']);
  }

  openResource(): void {
    window.open(this.resource.url, '_blank');
  }

  getFormatIcon(format: string): string {
    switch (format) {
      case 'PDF':
        return 'picture_as_pdf';
      case 'VIDEO':
        return 'videocam';
      case 'IMAGE':
        return 'image';
      case 'AUDIO':
        return 'audiotrack';
      case 'TEXT':
        return 'text_snippet';
      default:
        return 'attachment';
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'COURS':
        return 'bg-primary';
      case 'EXERCICE':
        return 'bg-success';
      case 'TRAVAIL_PRATIQUE':
        return 'bg-warning';
      case 'PROJET':
        return 'bg-info';
      case 'DOCUMENTATION':
        return 'bg-secondary';
      default:
        return 'bg-dark';
    }
  }
}
