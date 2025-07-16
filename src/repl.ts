import { createInterface } from "readline";
import { getCommands, CLICommand } from "./commands.js"
import { rootCertificates } from "tls";

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

        if (!(commandName in commands)) {
            console.log("Unknown command")
            rl.prompt();
            return;
        }

        await commands[commandName].callback(commands);

        rl.prompt();
    });
}