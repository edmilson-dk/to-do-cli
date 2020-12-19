#!/usr/bin/env node

const { join } = require('path');
const fs = require('fs');
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
//const shell = require('shelljs');
const Table = require('cli-table');

const pkg = require('./package.json');
const todosPath = join(__dirname, 'todos.json');

function getJson(path) {
  const data = fs.existsSync(path) ? fs.readFileSync(path) : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

function showTodoTable(data) {
  const table = new Table({
    head: ['id', 'to-do', 'status'],
    colWidths: [10, 20, 20],
  });

  data.map((todo, index) => {
    table.push(
      [index, todo.title, todo.done ? chalk.green('ok') : chalk.yellow('pending')]
    )
  });

  console.log(table.toString());
}

program.version(pkg.version);

program
  .command('add [todo]')
  .option('-s, --status [status]', 'Status inicial do to-do')
  .description('Adiciona um to-do')
  .action(async (todo, options) => {
    let answers;

    if (!todo) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'todo',
          message: 'Qual é seu to-do?',
          validate: value => value ? true : 'Não é permitido um to-do vazio!'
        }
      ]);
    }

    const data = getJson(todosPath);
    data.push({
      title: todo || answers.todo,
      done: (options.status === 'true') || false,
    });
    saveJson(todosPath, data);
    console.log(`${chalk.green('To-do adicionado com sucesso!')}`);
    showTodoTable(data)
  });

program
  .command('list')
  .description('Lista todos os to-do')
  .action(() => {
    const data = getJson(todosPath);
    showTodoTable(data);
  });

program
  .command('do <todo>')
  .description('Marca o to-do como feito')
  .action(async (todo) => {
    let answers;
    if (!todo) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'todo',
          message: 'Qual o id do to-do?',
          validate: value => value !== undefined ? true : 'Defina um to-do para ser atualizado!'
        }
      ]);
    }

    const data = getJson(todosPath);
    data[todo].done = true;
    saveJson(todosPath, data);
    console.log(`${chalk.green('To-do salvo com sucesso!')}`);
    showTodoTable(data);
  });

program
  .command('undo <todo>')
  .description('Marca o to-do como não feito')
  .action(async (todo) => {
    let answers;
    if (!todo) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'todo',
          message: 'Qual o id do to-do?',
          validate: value => value ? true : 'Defina um to-do para ser atualizado!'
        }
      ]);
    }

    const data = getJson(todosPath);
    data[todo].done = false;
    saveJson(todosPath, data);
    console.log(`${chalk.green('To-do salvo com sucesso!')}`);
    showTodoTable(data);
  });

/*
program
  .command('backup')
  .description('Faz um backup dos to-dos')
  .action(() => {
    shell.mkdir('-p', 'backup');
    const command = shell.exec('mv ./todos.json ./backup/todos.json', { silent: true });
    
    if (!command.code) {
      console.log(chalk.green('Backup realizado com sucesso!'));
    } else {
      console.log(command.stderr);
      console.log(chalk.red('Erro ao realizar backup'));
    }
  });
    */
program.parse(process.argv);
