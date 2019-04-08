import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  ResolveStart,
  ResolveEnd
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ResponseLogout, Oauth2Service } from '@suite/services';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '@suite/services';

interface MenuItem {
  title: string;
  url?: string;
  icon: string;
}

@Component({
  selector: 'suite-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages: MenuItem[] = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Usuarios',
      url: '/users/menu',
      icon: 'people'
    },
    {
      title: 'Roles',
      url: '/roles/menu',
      icon: 'person'
    },
    {
      title: 'Asignar Rol a Usuario',
      url: '/assign/rol/user',
      icon: 'person'
    },
    {
      title: 'Asignar Permiso a Rol',
      url: '/assign/per/rol',
      icon: 'person'
    },
    {
      title: 'Logout',
      icon: 'log-out'
    }
  ];

  navStart: Observable<NavigationStart>;
  navResStart: Observable<ResolveStart>;
  navResEnd: Observable<ResolveEnd>;

  // Presentation layer
  showMainHeader = false;
  showSidebar = false;
  displaySmallSidebar = false;
  iconsDirection = 'start';
  currentRoute: string = this.appPages[1].title;
  deploySidebarSmallDevices = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController,
    private loginService: Oauth2Service,
    private authenticationService: AuthenticationService
  ) {
    this.menu.enable(false, 'sidebar');
  }

  initializeApp() {
    this.showMainHeader = false;
    this.displaySmallSidebar = false;
    this.showSidebar = false;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.enable(false, 'sidebar');

      // Display button for small device to toggle sidemenu from main-header
      window.innerWidth < 992
        ? (this.deploySidebarSmallDevices = true)
        : (this.deploySidebarSmallDevices = false);

      /* Check for Authenticated user */
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']).then(sucess => {
            this.currentRoute = this.appPages[0].title;
            this.showMainHeader = true;
            this.menu.enable(true, 'sidebar');
          });
        } else {
          this.menu.enable(false, 'sidebar');
          this.showMainHeader = false;
          this.router.navigate(['login']);
        }
      });
    });
  }

  ngOnInit() {
    this.initializeApp();
  }

  tapOption(p: MenuItem) {
    console.log(p);
    this.currentRoute = p.title;
    if (p.title === 'Logout') {
      this.authenticationService.getCurrentToken().then(accessToken => {
        this.loginService
          .get_logout(accessToken)
          .subscribe((data: HttpResponse<ResponseLogout>) => {
            this.authenticationService.logout().then(success => {
              this.router.navigate(['login']);
            });
            console.log(data);
          });
      });
    }
  }

  toggleSidebar() {
    this.displaySmallSidebar = !this.displaySmallSidebar;
    this.displaySmallSidebar === true
      ? (this.iconsDirection = 'end')
      : (this.iconsDirection = 'start');
  }

  onResize(event) {
    event.target.innerWidth < 992
      ? ((this.deploySidebarSmallDevices = true),
        (this.displaySmallSidebar = true),
        (this.iconsDirection = 'start'))
      : ((this.deploySidebarSmallDevices = false),
        (this.displaySmallSidebar = true),
        (this.iconsDirection = 'end'));
  }

  toggleSidebarSmallDevices() {
    this.menu.toggle('sidebar');
  }
}
