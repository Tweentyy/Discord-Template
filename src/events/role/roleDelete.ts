import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.GuildRoleDelete,
		once: false,
	},
	async execute(client: ClientConstructor, role: ClientEvents[Events.GuildRoleDelete][0]) {},
};
