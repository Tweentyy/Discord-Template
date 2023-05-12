import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.GuildMemberUpdate,
		once: false,
	},
	async execute(
		client: ClientConstructor,
		oldMember: ClientEvents[Events.GuildMemberUpdate][0],
		newMember: ClientEvents[Events.GuildMemberUpdate][1],
	) {},
};
