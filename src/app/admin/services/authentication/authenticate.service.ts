import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable, of as ObservableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Authenticate } from '../../models/authenticate.model';
import { EncryptionService } from '../encryption/encryption.service';

import jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthenticateService {
  private currentAdminUserSubject: BehaviorSubject<any>;
  public currentAdminUser: Observable<Authenticate>;
  private refreshTokenTimeout: any;
  private nodeURL = environment.API_URL;
  public appName: any = environment.APP_NAME;

  constructor(
    private http: HttpClient,
    private router: Router,
    private Encryption: EncryptionService
  ) {
    this.currentAdminUserSubject = new BehaviorSubject<Authenticate>(JSON.parse(localStorage.getItem('currentAdminUser'+ this.appName) || '{}'));
    this.currentAdminUser = this.currentAdminUserSubject.asObservable();
  }

  get isLoggedIn() {
    return this.currentAdminUserSubject.asObservable();
  }

  public setCurrentUserSubject(data: any) {
    localStorage.setItem('currentAdminUser'+ this.appName, JSON.stringify(data));
    this.currentAdminUserSubject.next(data);
    return true;
  }

  public get currentAdminUserValue(): Authenticate {
    let authData = this.currentAdminUserSubject.value;
    if (authData && authData.accessToken && authData.refreshToken && authData.responseCode === 1) {
      let decoded: any = jwt_decode(authData.accessToken);
      if(decoded){
        let decodedVal = JSON.parse(this.Encryption.decryptData(decoded.data));
        return decodedVal.email ? decodedVal : {};
      }      
    }
    return {};
  }

  login(values: any) {
    return this.http.post<any>(`${this.nodeURL}/auth/authenticateUser`, values)
      .pipe(map((user: any) => {
        if(user && user.responseCode === 1){
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentAdminUser'+ this.appName, JSON.stringify(user));
          this.currentAdminUserSubject.next(user);
          this.startRefreshTokenTimer();
        }
        return user;
      }));
  }

  refreshToken = () => {
    let userData = this.currentAdminUserValue;
    let authData = this.currentAdminUserSubject.value;
    return this.http.post<any>(`${this.nodeURL}/auth/refreshToken`, {id: userData.id, refreshToken: authData.refreshToken})
        .pipe(map((user) => {
          if(user && user.responseCode === 1){
            localStorage.setItem('currentAdminUser'+ this.appName, JSON.stringify(user));
            this.currentAdminUserSubject.next(user);
            this.startRefreshTokenTimer();            
          }
          return user;
        }));
  }

  startRefreshTokenTimer = () => {
      let decoded: any = jwt_decode(this.currentAdminUserSubject.value.accessToken);
      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(decoded.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  stopRefreshTokenTimer = () => {
      clearTimeout(this.refreshTokenTimeout);
  }

  forgotPassword = async(values: any): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/auth/forgotPassword`, values);
    let respData= await lastValueFrom(resp);
    return respData;
  }

  resetPassword = async(values: any): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/auth/resetPassword`, values);
    let respData= await lastValueFrom(resp);
    return respData;
  }

  validateResetToken = async(token: String): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/auth/validateResetToken`, {token: token});
    let respData= await lastValueFrom(resp);
    return respData;
  }

  logout = async(): Promise<any> => {
      let resp = this.http.post(`${this.nodeURL}/auth/logoutAdminUser`, {});
      let respData:any = await lastValueFrom(resp);
      // remove user from local storage to log user out
      localStorage.removeItem('currentAdminUser'+ this.appName);
      this.currentAdminUserSubject.next({});
      this.stopRefreshTokenTimer();
      this.router.navigate(['/admin/auth/login']);
  }
}