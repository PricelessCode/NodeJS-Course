const fs = require('fs');
const chalk = require('chalk');


const getNotes = () => {
    return 'Your notes...'
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.bgGreen(title));
        console.log(note.body);
    } else {
        console.log(chalk.bgRed("Note not found!"))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        console.log(chalk.bgRed('Note title taken!'))
    } else {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.bgGreen('New note added!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => {
        return title !== note.title
    });

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note removed!'))
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.bgRed('No note found!'))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJsON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("List"));
    notes.forEach(element => {
        console.log(element);
    });
    yargs.command({

    });

}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}