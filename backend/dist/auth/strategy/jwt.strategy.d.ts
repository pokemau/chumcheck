import { EntityManager } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private em;
    constructor(config: ConfigService, em: EntityManager);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<import("@mikro-orm/core").Loaded<User, never, "*", "hash"> | null>;
}
export {};
