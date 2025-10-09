import { Module } from "@nestjs/common";
import { AssessmentController } from "./assessment.controller";
import { AssessmentService } from "./assessment.service";

@Module({
    controllers: [AssessmentController],
    providers: [AssessmentService]
})
export class AssessmentModule {}