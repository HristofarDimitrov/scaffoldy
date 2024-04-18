import {
  writeFileSync,
  readFileSync,
  mkdirSync,
  existsSync,
  statSync,
  readdirSync,
} from "fs";
import path from "path";
import shell from "shelljs";

export const replicateTemplates = (
  templatePath: string,
  projectPath: string
) => {
  let templateContentNames = readdirSync(templatePath);
  const filesToBeSkipped = ["node_modules", "build", "dist"];

  templateContentNames = templateContentNames.filter(
    (name) => !filesToBeSkipped.includes(name)
  );

  if (!existsSync(projectPath)) {
    mkdirSync(projectPath);
  } else {
    console.error("Directory already exists. Choose another name");
    return;
  }

  templateContentNames.forEach((name) => {
    const originPath = path.join(templatePath, name);
    const destinationPath = path.join(projectPath, name);
    const stats = statSync(originPath);
    if (stats.isFile()) {
      const content = readFileSync(originPath, "utf8");
      writeFileSync(destinationPath, content);
    } else if (stats.isDirectory()) {
      replicateTemplates(originPath, destinationPath);
    }
  });

  if (templateContentNames.includes("package.json")) {
    shell.cd(projectPath);

    shell.exec("git init");
    shell.exec("pnpm install");
  }
};
