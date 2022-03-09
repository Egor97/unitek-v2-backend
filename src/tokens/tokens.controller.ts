import {Controller, Post} from "@nestjs/common";

@Controller('tokens')
export class TokensController {
    @Post()
    createToken(): boolean {
        return true
    }
}
