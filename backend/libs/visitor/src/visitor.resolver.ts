import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { VisitorType } from "./dto/visitor.dto";
import { Visitor } from "./models/visitor.model";
import { VisitorService } from "./visitor.service";

@Resolver((of) => Visitor)
export class VisitorResolver {
    constructor(private visitorService: VisitorService) {}

    @Query((returns) => String)
    async hello() {
        return "👋";
    }

    @Query((returns) => [VisitorType])
    async visitors() {
        return this.visitorService.findAll();
    }

    @Mutation((returns) => VisitorType)
    async createVisitor(@Args("input") input: VisitorType) {
        return this.visitorService.create(input);
    }
}
