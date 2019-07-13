import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from '../../constants/index'

export default class auth {
    setToken(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
    }
    getAuthHeader() {
        return {'Authorization': 'Bearer ' + this.getToken(), 'Content-Type': 'application/json'};
    }
    getToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }
    isAthenticated() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    authUser() {
        const user = jwt.decode(this.getToken());
        return user;
    }
    isTokenExpired(token) {
        try {
            const user = this.authUser(token);
            if (user.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    logout() {
        localStorage.removeItem(ACCESS_TOKEN);
    }
    _checkResponseStatus(response) {
        if (response.status >= 200 && response < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}
