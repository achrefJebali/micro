import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-node-service',
  templateUrl: './node-service.component.html',
  styleUrls: ['./node-service.component.scss']
})
export class NodeServiceComponent implements OnInit {
  serviceStatus = 'Checking...';
  serviceInfo: any = null;
  loading = false;
  error = '';
  logs: string[] = [];
  metrics: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.checkNodeService();
  }

  checkNodeService(): void {
    this.loading = true;
    this.http.get('http://localhost:8081/node-service/status').subscribe({
      next: (data: any) => {
        this.serviceStatus = 'Online';
        this.serviceInfo = data;
        this.loading = false;
        this.fetchLogs();
        this.fetchMetrics();
      },
      error: (e) => {
        this.serviceStatus = 'Offline';
        this.error = 'Failed to connect to Node service. Please check if the service is running.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  fetchLogs(): void {
    this.http.get('http://localhost:8081/node-service/logs').subscribe({
      next: (data: any) => {
        this.logs = data.logs || [];
      },
      error: (e) => {
        console.error('Failed to fetch logs', e);
      }
    });
  }

  fetchMetrics(): void {
    this.http.get('http://localhost:8081/node-service/metrics').subscribe({
      next: (data: any) => {
        this.metrics = data;
      },
      error: (e) => {
        console.error('Failed to fetch metrics', e);
      }
    });
  }

  restartService(): void {
    if (confirm('Are you sure you want to restart the Node service?')) {
      this.loading = true;
      this.http.post('http://localhost:8081/node-service/restart', {}).subscribe({
        next: () => {
          this.serviceStatus = 'Restarting...';
          setTimeout(() => {
            this.checkNodeService();
          }, 2000);
        },
        error: (e) => {
          this.error = 'Failed to restart Node service. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  clearLogs(): void {
    if (confirm('Are you sure you want to clear all logs?')) {
      this.http.delete('http://localhost:8081/node-service/logs').subscribe({
        next: () => {
          this.logs = [];
        },
        error: (e) => {
          this.error = 'Failed to clear logs. Please try again.';
          console.error(e);
        }
      });
    }
  }
}
