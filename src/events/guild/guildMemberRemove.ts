import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.GuildMemberRemove,
		once: false,
	},
	async execute(client: ClientConstructor, member: ClientEvents[Events.GuildMemberRemove][0]) {},
};
