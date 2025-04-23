import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from '../../../models/resource.model';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  resources: Resource[] = [];
  loading = false;
  error = '';

  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.loading = true;
    this.resourceService.getAllResources().subscribe({
      next: (data) => {
        this.resources = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load resources. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/resources', id]);
  }

  editResource(id: number): void {
    this.router.navigate(['/resources/edit', id]);
  }

  deleteResource(id: number): void {
    if (confirm('Are you sure you want to delete this resource?')) {
      this.resourceService.deleteResource(id).subscribe({
        next: () => {
          this.loadResources();
        },
        error: (e) => {
          this.error = 'Failed to delete resource. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  createResource(): void {
    this.router.navigate(['/resources/new']);
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
}
