import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MenubarModule,
    TabMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  constructor(private http: HttpClient, private router: Router) {}
  title = 'ElasticSearch Playground';
  elasticServerVersion = '';
  baseUrl = 'http://localhost:9200';
  routeItems: Array<any> = [];
  activeItem: any = {};

  ngOnInit() {
    this.routeItems = [
      {
        label: 'Search',
        icon: 'pi pi-search',
        command: () => {
          this.router.navigate(['']);
        },
      },
      {
        label: 'Analysis',
        icon: 'pi pi-chart-bar',
        command: () => {
          this.router.navigate(['analysis']);
        },
      },
    ];
    this.activeItem = this.routeItems[0];
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.activeItem =
          event.url === '/analysis' ? this.routeItems[1] : this.routeItems[0];
      });
  }
  onActiveItemChange(ev: MenuItem) {}

  errorText = '';
}
