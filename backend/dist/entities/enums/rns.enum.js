"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiRnsStatus = exports.RnsStatus = void 0;
var RnsStatus;
(function (RnsStatus) {
    RnsStatus[RnsStatus["New"] = 1] = "New";
    RnsStatus[RnsStatus["Scheduled"] = 2] = "Scheduled";
    RnsStatus[RnsStatus["On Track"] = 3] = "On Track";
    RnsStatus[RnsStatus["Completed"] = 4] = "Completed";
    RnsStatus[RnsStatus["Delayed"] = 5] = "Delayed";
    RnsStatus[RnsStatus["Discontinued"] = 6] = "Discontinued";
    RnsStatus[RnsStatus["Long Term"] = 7] = "Long Term";
})(RnsStatus || (exports.RnsStatus = RnsStatus = {}));
var AiRnsStatus;
(function (AiRnsStatus) {
    AiRnsStatus[AiRnsStatus["Short-term"] = 1] = "Short-term";
    AiRnsStatus[AiRnsStatus["Long-term"] = 2] = "Long-term";
})(AiRnsStatus || (exports.AiRnsStatus = AiRnsStatus = {}));
//# sourceMappingURL=rns.enum.js.map