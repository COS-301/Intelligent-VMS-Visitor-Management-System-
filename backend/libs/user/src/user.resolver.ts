import { UseGuards, Inject, forwardRef } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "@vms/auth";
import { GqlAuthGuard } from "@vms/auth/guards/GqlAuthGuard.guard";
import { LocalAuthGuard } from "@vms/auth/guards/LocalAuthGuard.guard";

import { UserService } from "./user.service";

import { User } from "./models/user.model";
import { LoginUser } from "./dto/loginUser.dto";

@Resolver((of) => User)
export class UserResolver {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query((returns) => String, { name: "helloUser" })
    async hello() {
        return "👋 from User";
    }

    @UseGuards(LocalAuthGuard)
    @Mutation((returns) => LoginUser, { name: "login" })
    async login(
        @Args("email") email: string,
        @Args("password") password: string,
    ) {
        return await this.authService.login({
            email: email,
            password: password,
        });
    }
}
