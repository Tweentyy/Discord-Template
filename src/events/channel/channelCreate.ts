import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.ChannelCreate,
		once: false,
	},
	async execute(client: ClientConstructor, channel: ClientEvents[Events.ChannelCreate][0]) {},
};
