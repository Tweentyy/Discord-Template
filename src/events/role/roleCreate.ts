import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.GuildRoleCreate,
		once: false,
	},
	async execute(client: ClientConstructor, role: ClientEvents[Events.GuildRoleCreate][0]) {},
};
