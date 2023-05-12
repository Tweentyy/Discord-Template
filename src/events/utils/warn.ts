import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";
import { log } from "../../modules/functions.js";

export default {
	data: {
		name: Events.Warn,
		once: false,
	},
	async execute(client: ClientConstructor, message: ClientEvents[Events.Warn][0]) {
		log("error", message);
	},
};
