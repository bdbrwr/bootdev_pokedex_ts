import { getCommands, CLICommand } from "./commands.js"

const commands = getCommands()

export function commandHelp() {
    console.log("Usage: \n")

    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`)
    }
}