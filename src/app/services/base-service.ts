import { HttpHeaders } from "@angular/common/http";

export class BaseService {
    private headers: HttpHeaders = new HttpHeaders();

    private validateHeaders(): void {
        const json = sessionStorage.getItem("current-user-token") ?? "";
        if (json != "") {
            const auth_token = JSON.parse(json);
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`
            });
        }
    }

    public getHeaders(): HttpHeaders{
        this.validateHeaders();
        return this.headers;
    }
}
