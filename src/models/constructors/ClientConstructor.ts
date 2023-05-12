import { Client, Collection, REST, Routes, SlashCommandBuilder } from "discord.js";
import type { ClientOptions, Interaction } from "discord.js";
import { readdirSync, statSync } from "fs";
import path from "path";
import { log } from "../../modules/functions.js";
import { InteractionFollowUp } from "./InteractionConstructor.js";

export class ClientConstructor extends Client {
	autoCompletes: Collection<string, InteractionData>;
	buttons: Collection<string, InteractionData>;
	contextMenus: Collection<string, InteractionData>;
	modals: Collection<string, InteractionData>;
	selectMenus: Collection<string, InteractionData>;
	slashCommands: Collection<string, InteractionData>;

	constructor(client: ClientOptions) {
		super(client);
		this.autoCompletes = new Collection();
		this.buttons = new Collection();
		this.contextMenus = new Collection();
		this.modals = new Collection();
		this.selectMenus = new Collection();
		this.slashCommands = new Collection();
	}

	///////////////////////////////////////////// PRIVATE /////////////////////////////////////////////

	private getAllFilesPath = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
		const files = readdirSync(dirPath);
		files.forEach((file) => {
			if (statSync(dirPath + "/" + file).isDirectory()) {
				arrayOfFiles = this.getAllFilesPath(dirPath + "/" + file, arrayOfFiles);
			} else {
				const __dirname = path.resolve();
				arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
			}
		});
		return arrayOfFiles;
	};

	///////////////////////////////////////////// PUBLIC /////////////////////////////////////////////

	connection = (token: string | undefined): void => {
		this.once("error", (error) => console.error(error));

		this.login(token)
			.then(() => log("info", "La connexion est réalisée."))
			.catch((error) => log("error", `La connexion via le token a renvoyé une erreur : \n${error}`));

		process
			.on("unhandledRejection", (error: string) => {
				console.error(`Unhandled promise rejection: ${error}`);
				log("error", error);
			})
			.on("uncaughtException", (error) => {
				console.error(`Uncaught rejection: ${error}`);
				log("error", error);
			});
	};

	executeInteraction = async (interaction: Interaction, interactionData: InteractionData) => {
		if (interaction.inCachedGuild()) {
			try {
				interactionData.execute(this, interaction).then(() => {
					if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
						log("info", `J'exécute la commande ${interaction.commandName} (par ${interaction.user.tag}).`);
					}
				});
			} catch (error) {
				console.error(error);
				if (interaction.isChatInputCommand()) {
					await new InteractionFollowUp("Il y a eu un problème d'exécution de la commande").respond(
						interaction,
					);
					log("error", `Problème d'exécution de la commande ${interaction.commandName} : ${error}`);
				}
			}
		}
	};

	loadFile = (fileData: { type: string }, file: string): void | string => {
		try {
			import(`file://${file}`).then(({ default: interactionOrEvent }) => {
				const name = interactionOrEvent.data.name;
				const type = fileData.type;
				log("info", `Fichier de type ${fileData.type} : ${name} a été chargé.`);

				switch (type) {
					case FileType.AutoComplete:
						return this.autoCompletes.set(name, interactionOrEvent);
					case FileType.Button:
						return this.buttons.set(name, interactionOrEvent);
					case FileType.ContextMenu:
						return this.contextMenus.set(name, interactionOrEvent);
					case FileType.Event:
						const event = interactionOrEvent;
						if (event.data.once) {
							return this.once(event.data.name, (...args) => event.execute(this, ...args));
						} else {
							return this.on(event.data.name, (...args) => event.execute(this, ...args));
						}
					case FileType.Modal:
						return this.modals.set(name, interactionOrEvent);
					case FileType.SelectMenu:
						return this.selectMenus.set(name, interactionOrEvent);
					case FileType.SlashCommand:
						return this.slashCommands.set(name, interactionOrEvent);
				}
			});
		} catch (error) {
			return `Impossible de charger le fichier ${file} : \n${error}`;
		}
	};

	init = async () => {
		console.clear();
		this.requiredFiles([
			{ type: FileType.AutoComplete, path: "./interaction/autocomplete" },
			{ type: FileType.Button, path: "./interaction/button" },
			{ type: FileType.ContextMenu, path: "./commands/context-menu" },
			{ type: FileType.Event, path: "./events" },
			{ type: FileType.Modal, path: "./interaction/modal" },
			{ type: FileType.SelectMenu, path: "./interaction/selectmenu" },
			{ type: FileType.SlashCommand, path: "./commands/slash" },
		]);
	};

	initializeCommands = async (): Promise<void> => {
		const commands = [
			...Array.from(this.slashCommands.values()).map((command) => command.data),
			...Array.from(this.contextMenus.values()).map((command) => command.data),
		];

		const rest = new REST({ version: "10" }).setToken(this.token!);
		try {
			log("info", "Initialisation des commandes d'application (/).");
			await rest
				.put(Routes.applicationCommands(this.user!.id), { body: commands })
				.then(() => log("info", "Initialisation des commandes d'application (/) terminée avec succès."));
		} catch (error: any) {
			log("error", error);
		}
	};

	requiredFiles = (directoriesToRequire: File[]) => {
		directoriesToRequire.forEach((directory) => {
			const files = this.getAllFilesPath(directory.path).filter((file) => file.endsWith(".js"));
			files.forEach((file) => {
				const response = this.loadFile(directory, file);
				if (response) {
					log("error", response);
				}
			});
		});
	};
}


/////////////////////////////////////// ENUMS & INTERFACES ///////////////////////////////////////

export enum FileType {
	AutoComplete = "autoComplete",
	Button = "button",
	ContextMenu = "contextMenu",
	Event = "event",
	Modal = "modal",
	SelectMenu = "selectMenu",
	SlashCommand = "slashCommand",
}

export interface File {
	type: string;
	path: string;
}

export interface InteractionData {
	data: SlashCommandBuilder | {
		name: string;
		once: boolean;
	};
	execute: Function;
}
