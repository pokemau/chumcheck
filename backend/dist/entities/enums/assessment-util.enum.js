"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentAnswerType = exports.AssessmentStatus = void 0;
var AssessmentStatus;
(function (AssessmentStatus) {
    AssessmentStatus[AssessmentStatus["Pending"] = 1] = "Pending";
    AssessmentStatus[AssessmentStatus["Completed"] = 2] = "Completed";
})(AssessmentStatus || (exports.AssessmentStatus = AssessmentStatus = {}));
var AssessmentAnswerType;
(function (AssessmentAnswerType) {
    AssessmentAnswerType[AssessmentAnswerType["ShortAnswer"] = 1] = "ShortAnswer";
    AssessmentAnswerType[AssessmentAnswerType["LongAnswer"] = 2] = "LongAnswer";
    AssessmentAnswerType[AssessmentAnswerType["File"] = 3] = "File";
})(AssessmentAnswerType || (exports.AssessmentAnswerType = AssessmentAnswerType = {}));
//# sourceMappingURL=assessment-util.enum.js.map