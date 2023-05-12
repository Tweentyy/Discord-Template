import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.MessageUpdate,
		once: false,
	},
	async execute(
		client: ClientConstructor,
		oldMessage: ClientEvents[Events.MessageUpdate][0],
		newMessage: ClientEvents[Events.MessageUpdate][1],
	) {},
};
