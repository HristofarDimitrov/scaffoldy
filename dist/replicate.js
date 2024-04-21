"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replicateTemplates = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const replicateTemplates = (templatePath, projectPath) => {
    let templateContentNames = (0, fs_1.readdirSync)(templatePath);
    const filesToBeSkipped = ["node_modules", "build", "dist"];
    templateContentNames = templateContentNames.filter((name) => !filesToBeSkipped.includes(name));
    if (!(0, fs_1.existsSync)(projectPath)) {
        (0, fs_1.mkdirSync)(projectPath);
    }
    else {
        console.error("Directory already exists. Choose another name");
        return;
    }
    templateContentNames.forEach((name) => {
        const originPath = path_1.default.join(templatePath, name);
        const destinationPath = path_1.default.join(projectPath, name);
        const stats = (0, fs_1.statSync)(originPath);
        if (stats.isFile()) {
            const content = (0, fs_1.readFileSync)(originPath, "utf8");
            (0, fs_1.writeFileSync)(destinationPath, content);
        }
        else if (stats.isDirectory()) {
            (0, exports.replicateTemplates)(originPath, destinationPath);
        }
    });
    if (templateContentNames.includes("package.json")) {
        shelljs_1.default.cd(projectPath);
        shelljs_1.default.exec("git init");
        shelljs_1.default.exec("pnpm install");
    }
};
exports.replicateTemplates = replicateTemplates;
//# sourceMappingURL=replicate.js.map