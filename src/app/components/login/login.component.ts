import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import catLearnConfig from 'src/app/config/cat-learn-config';
import * as OktaSignIn from '@okta/okta-signin-widget';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    oktaSignin: any;
  
    constructor(private oktaAuthService: OktaAuthService) { 
  
      this.oktaSignin = new OktaSignIn({
        
        features: {
          registration: true
        },
        baseUrl: catLearnConfig.oidc.issuer.split('/oauth2')[0],
        clientId: catLearnConfig.oidc.clientId,
        redirectUri: catLearnConfig.oidc.redirectUri,
        authParams: {
          pkce: true,
          issuer: catLearnConfig.oidc.issuer,
          scopes: catLearnConfig.oidc.scopes
        }
      });
  
    }
  
    ngOnInit(): void {
      this.oktaSignin.remove();
  
      this.oktaSignin.renderEl({
        el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
        (response) => {
          if (response.status === 'SUCCESS') {
            this.oktaAuthService.signInWithRedirect();
          }
        },
        (error) => {
          throw error;
        }
      );
    }
  
  }
  


