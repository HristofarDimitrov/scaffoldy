import path from "path";
import prompts, { PromptObject } from "prompts";
import { replicateTemplates } from "./replicate";

const questions: PromptObject[] = [
  {
    type: "text",
    name: "projectName",
    message: "What is the name of your new project .",
    validate: (name) =>
      name.trim().length < 1 || typeof name !== "string"
        ? "Project name is required"
        : true,
  },
  {
    type: "select",
    name: "templateName",
    message: "Which template do you want to generate",
    validate: (name) =>
      name.trim().length < 1 ? "Template name is required" : true,
    choices: [
      {
        title: "React TypeScript TailwindCSS",
        value: "react-ts-tailwind",
      },
    ],
  },
];

export const execPrompt = () => {
  prompts(questions)
    .then((answers) => {
      const projectName = answers.projectName;
      const templateName = answers.templateName;

      const projectPath = path.join(process.cwd(), projectName);

      replicateTemplates(`${__dirname}/templates/${templateName}`, projectPath);
    })
    .catch((error) => console.error(error.message));
};
