"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execPrompt = void 0;
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const replicate_1 = require("./replicate");
const questions = [
    {
        type: "text",
        name: "projectName",
        message: "What is the name of your new project .",
        validate: (name) => name.trim().length < 1 || typeof name !== "string"
            ? "Project name is required"
            : true,
    },
    {
        type: "select",
        name: "templateName",
        message: "Which template do you want to generate",
        validate: (name) => name.trim().length < 1 ? "Template name is required" : true,
        choices: [
            {
                title: "React TypeScript TailwindCSS",
                value: "react-ts-tailwind",
            },
        ],
    },
];
const execPrompt = () => {
    (0, prompts_1.default)(questions)
        .then((answers) => {
        const projectName = answers.projectName;
        const templateName = answers.templateName;
        const projectPath = path_1.default.join(process.cwd(), projectName);
        (0, replicate_1.replicateTemplates)(`${__dirname}/templates/${templateName}`, projectPath);
    })
        .catch((error) => console.error(error.message));
};
exports.execPrompt = execPrompt;
//# sourceMappingURL=prompt.js.map