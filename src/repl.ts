import { createInterface } from "readline";
import { getCommands } from "./commands.js"
import { rootCertificates } from "tls";
import { CLICommand } from './command.js'

const commands = getCommands();

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter((word) => word !== "");
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });

    console.log("Welcome to the Pokedex!")
    rl.prompt();

    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        const commandName = words[0];
        const cmd = commands[commandName];

        if (!cmd) {
            console.log("Unknown command");
            console.log();
            rl.prompt();
            return;
        }

        try {
            cmd.callback(commands);
        } catch (e) {
            console.log(e);
        }

        rl.prompt();
    });
}