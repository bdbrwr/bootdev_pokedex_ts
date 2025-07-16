import { getCommands } from "./commands.js"

const commands = getCommands()

export function commandHelp() {
    console.log()
    console.log("Usage:")

    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
    console.log();
}