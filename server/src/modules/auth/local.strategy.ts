import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local"

export class LocalStategy extends PassportStrategy(Strategy) {
    
}