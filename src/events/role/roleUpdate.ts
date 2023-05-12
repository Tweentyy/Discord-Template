import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.GuildRoleUpdate,
		once: false,
	},
	async execute(
		client: ClientConstructor,
		oldRole: ClientEvents[Events.GuildRoleUpdate][0],
		newRole: ClientEvents[Events.GuildRoleUpdate][0],
	) {},
};
