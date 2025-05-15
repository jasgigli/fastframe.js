/**
 * Create FastFrame.js
 * Create FastFrame.js projects with one command
 */

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

// Define the program
const program = new Command();

// Set up the CLI
program
  .name('create-fastframe')
  .description('Create FastFrame.js projects with one command')
  .version('0.1.0')
  .argument('[name]', 'Project name')
  .option('-t, --template <template>', 'Template to use', 'default')
  .option('--ts', 'Use TypeScript', false)
  .option('--no-install', 'Skip package installation', false)
  .option('--package-manager <pm>', 'Package manager to use (npm, yarn, pnpm)', 'npm')
  .action(async (name, options) => {
    console.log(chalk.bold(chalk.blue('\n🚀 Create FastFrame.js\n')));
    
    // If no name is provided, prompt for one
    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Project name:',
          default: 'my-fastframe-app'
        }
      ]);
      name = answers.name;
    }
    
    // If no template is provided, prompt for one
    if (!options.template) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Select a template:',
          choices: [
            { name: 'Default', value: 'default' },
            { name: 'TypeScript', value: 'typescript' }
          ]
        }
      ]);
      options.template = answers.template;
    }
    
    // If TypeScript template is selected, set ts option to true
    if (options.template === 'typescript') {
      options.ts = true;
    }
    
    // If no package manager is provided, prompt for one
    if (!options.packageManager) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'packageManager',
          message: 'Select a package manager:',
          choices: [
            { name: 'npm', value: 'npm' },
            { name: 'yarn', value: 'yarn' },
            { name: 'pnpm', value: 'pnpm' }
          ]
        }
      ]);
      options.packageManager = answers.packageManager;
    }
    
    // Create the project
    await createProject(name, options);
  });

// Parse command line arguments
program.parse(process.argv);

/**
 * Create a new FastFrame.js project
 * @param name - Project name
 * @param options - Project options
 */
async function createProject(name: string, options: any) {
  const projectDir = path.resolve(process.cwd(), name);
  
  // Check if directory exists
  if (fs.existsSync(projectDir)) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Directory ${chalk.cyan(name)} already exists. Overwrite?`,
        default: false
      }
    ]);
    
    if (!answers.overwrite) {
      console.log(chalk.red('✖ Operation cancelled'));
      process.exit(1);
    }
    
    // Remove existing directory
    fs.removeSync(projectDir);
  }
  
  // Create project directory
  const spinner = ora(`Creating project ${chalk.cyan(name)}...`).start();
  
  try {
    // Create directory
    fs.mkdirSync(projectDir, { recursive: true });
    
    // Run fastframe CLI to initialize the project
    const initCommand = `npx fastframe-cli init ${name} -t ${options.template} ${options.ts ? '--ts' : ''}`;
    execSync(initCommand, { stdio: 'ignore' });
    
    spinner.succeed(`Project ${chalk.cyan(name)} created successfully`);
    
    // Install dependencies
    if (options.install) {
      const installSpinner = ora('Installing dependencies...').start();
      
      try {
        const installCommand = getInstallCommand(options.packageManager);
        execSync(installCommand, { cwd: projectDir, stdio: 'ignore' });
        installSpinner.succeed('Dependencies installed successfully');
      } catch (error) {
        installSpinner.fail('Failed to install dependencies');
        console.error(chalk.red(`Error: ${error}`));
      }
    }
    
    // Show next steps
    console.log('\n' + chalk.bold('Next steps:'));
    console.log(`  ${chalk.cyan(`cd ${name}`)}`);
    
    if (!options.install) {
      console.log(`  ${chalk.cyan(`${options.packageManager} install`)}`);
    }
    
    console.log(`  ${chalk.cyan(`${options.packageManager} run dev`)}`);
    
    console.log('\n' + chalk.bold('Documentation:'));
    console.log(`  ${chalk.cyan('https://fastframejs.org')}`);
  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(chalk.red(`Error: ${error}`));
    process.exit(1);
  }
}

/**
 * Get the install command for the selected package manager
 * @param packageManager - Package manager
 */
function getInstallCommand(packageManager: string): string {
  switch (packageManager) {
    case 'yarn':
      return 'yarn';
    case 'pnpm':
      return 'pnpm install';
    case 'npm':
    default:
      return 'npm install';
  }
}
