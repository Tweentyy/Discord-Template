import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.ChannelUpdate,
		once: false,
	},
	async execute(
		client: ClientConstructor,
		oldChannel: ClientEvents[Events.ChannelUpdate][0],
		newChannel: ClientEvents[Events.ChannelUpdate][1],
	) {},
};
