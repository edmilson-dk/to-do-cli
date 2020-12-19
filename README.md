# ToDO - CLI

This is a simple todo-list in cli format, developed in nodejs.

## Installation

__First clone the repository on your machine__

```sh 
git clone https://github.com/DKSecurity99/to-do-cli
```

__Then access the created folder and install the dependencies, with npm or yarn, make sure you have nodejs installed__

```sh
npm install 
```

or 

```sh 
yarn
```

## Running

Below we have the commands available for you to use the cli.

> the created to-do are stored in the same directory of the tool, in the todos.json file.

__Add a new to-do__

```sh
todo add
```

![Add to-do](https://tlgur.com/d/4AYkMKb4)

__List all to-dos__

```sh
todo list
```

![List to-dos](https://tlgur.com/d/g3vA1ezG)

__Change the state of the to-do to completed__

```sh
todo do [index]
```

![Change todo](https://tlgur.com/d/gj5zeJ6G)

__Change the state of the whole to pending__


> As you can see the word "pending" is misspelled in the classified images, 
> I realized after taking the images, but the error has already been corrected.

```sh
todo undo [index]
```

![Change to-do](https://tlgur.com/d/8KoyM9v8)

__List all commands__

```sh
todo -h
```

![List commands](https://tlgur.com/d/gpzbONd8)
