import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";
import { log } from "../../modules/functions.js";

export default {
	data: {
		name: Events.Error,
		once: false,
	},
	async execute(client: ClientConstructor, error: ClientEvents[Events.Error][0]) {
		log("error", error);
	},
};
