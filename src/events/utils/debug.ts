import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";
import { log } from "../../modules/functions.js";

export default {
	data: {
		name: Events.Debug,
		once: false,
	},
	async execute(client: ClientConstructor, message: ClientEvents[Events.Debug][0]) {
		log("info", message);
	},
};
