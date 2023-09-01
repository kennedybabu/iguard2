import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router"; 
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";


@Injectable({
  providedIn: 'root'
})

export class RoleBaseGuard implements CanActivate {

  user!: any

  constructor(private authService:AuthService, private router:Router){
    this.authService.userData$.subscribe((res) => {
      this.user = JSON.parse(res)
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(!this.user) {
      this.router.navigate(['login']) 
      this.authService.logout()
      return false
    }


    const userPermission = this.user.permissions 
    const validRoles = route.data['authorities'] || [] 

    let permission = userPermission.map((item: any) => {
      return item['role_name']
    })


    if(userPermission && !permission.includes('ADMIN') && !permission.includes('SUPER_ADMIN')) {
      this.router.createUrlTree(['/login'])
      return false
    }
    return true
    
  }
}
