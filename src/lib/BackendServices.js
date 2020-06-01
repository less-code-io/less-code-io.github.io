import JsonRpcClient from './JsonRpcClient';
import {checkCookie} from './Common';

class BackendServices {

    jsonRpcClient;
    authData;

    constructor(){
        this.jsonRpcClient = new JsonRpcClient("UiServices");
    }

    async signIn({email,password}){
        const result = await this.jsonRpcClient.call(undefined,"AuthService", "signIn", [email,password]);
        return result.result;
    }

    async signUp({host, recaptchaToken,email,password}){
        const result = await this.jsonRpcClient.call(undefined,"AuthService", "signUp", [host, recaptchaToken,email,password]);
        return result.result;
    }

    async forgotPassword({host, recaptchaToken,email}){
        const result = await this.jsonRpcClient.call(undefined,"AuthService", "forgotPassword", [host, recaptchaToken,email]);
        return result.result;
    }    
    
    async resetPassword({token,password}){
        const result = await this.jsonRpcClient.call(undefined,"AuthService", "resetPassword", [token,password]);
        return result.result;
    }    

    async submitContact({recaptchaToken,data}){
        const result = await this.jsonRpcClient.call(undefined,"AuthService", "submitContact", [recaptchaToken,data]);
        return result.result;
    }

    async confirmAccount({token}){
        const result = await this.jsonRpcClient.call(undefined,"AuthService", "confirmAccount", [token]);
        return result.result;
    }

    async saveProfile(profile){
        const result = await this.jsonRpcClient.call(this.authData.token,"ProfileService", "saveProfile", [profile]);
        return result.result;
    }
}

const AuthServicePlugin  = {
    install(Vue) {
        const serviceObj = new BackendServices();
        serviceObj.authData = checkCookie();
        Vue.prototype.$backendServices = serviceObj;
    }
};
  
export default AuthServicePlugin;