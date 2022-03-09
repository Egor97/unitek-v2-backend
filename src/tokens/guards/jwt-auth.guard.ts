import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private authorizationHeader: string;
    private bearer: string;
    private token: string;

    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            this.authorizationHeader = request.headers.authorization;
            this.bearer = this.authorizationHeader.split(' ')[0];
            this.token = this.authorizationHeader.split(' ')[1];
        } catch (e) {
            throw new UnauthorizedException('Нет токена доступа');
        }

        if (this.bearer !== 'Bearer' && !this.token) {
            throw new UnauthorizedException('Пользователь не авторизован');
        }

        try {
            request.user = this.jwtService.verify(this.token);
        } catch (e) {
            throw new UnauthorizedException('Некорректный токен доступа');
        }

        return true;
    }
}
