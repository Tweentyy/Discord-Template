import { Events } from "discord.js";
import type { ClientConstructor } from "../models/constructors/ClientConstructor.js";
import { log } from "../modules/functions.js";

export default {
	data: {
		name: Events.ClientReady,
		once: true,
	},
	async execute(client: ClientConstructor) {
		log("info", `${client.user!.username} en ligne et opérationnel.`);

		const guilds = await client.guilds.fetch();
		for (const guildId of guilds.keys()) {
			const guild = await client.guilds.fetch(guildId);
			await guild.members.fetch();
			await guild.roles.fetch();
			await guild.channels.fetch();
		}

		await client.initializeCommands();
	},
};
