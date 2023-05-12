import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.MessageDelete,
		once: false,
	},
	async execute(client: ClientConstructor, message: ClientEvents[Events.MessageDelete][0]) {},
};
