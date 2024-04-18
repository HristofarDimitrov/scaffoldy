"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replicateTemplates = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const replicateTemplates = (templatePath, projectPath) => {
    //Get template file names
    let templateContentNames = fs_1.default.readdirSync(templatePath);
    //filter out skip list
    const filesToBeSkipped = ["node_modules", "build", "dist"];
    templateContentNames = templateContentNames.filter((name) => !filesToBeSkipped.includes(name));
    if (!fs_1.default.existsSync(projectPath)) {
        fs_1.default.mkdirSync(projectPath);
    }
    else {
        console.error("Directory already exists. Choose another name");
        return;
    }
    templateContentNames.forEach((name) => {
        const originPath = path_1.default.join(templatePath, name);
        const destinationPath = path_1.default.join(projectPath, name);
        const stats = fs_1.default.statSync(originPath);
        if (stats.isFile()) {
            const content = fs_1.default.readFileSync(originPath, "utf8");
            fs_1.default.writeFileSync(destinationPath, content);
        }
        else if (stats.isDirectory()) {
            (0, exports.replicateTemplates)(originPath, destinationPath);
        }
    });
    if (templateContentNames.includes("package.json")) {
        //Navigate to the new project directory
        shelljs_1.default.cd(projectPath);
        //Run npm install
        console.log("Running npm install");
        shelljs_1.default.exec("npm install");
    }
};
exports.replicateTemplates = replicateTemplates;
//# sourceMappingURL=replicate.js.map