import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: Events.InteractionCreate,
		once: false,
	},
	async execute(client: ClientConstructor, interaction: ClientEvents[Events.InteractionCreate][0]) {
		if (!interaction.isAutocomplete()) return;

		if (interaction.inCachedGuild()) {
			if (!client.isReady()) {
				interaction.respond([{ name: "clientReadyError", value: "Erreur : Le Bot est en train de démarrer"}])
			}
			const { commandName } = interaction;
			const autoComplete = client.autoCompletes.get(commandName);
			if (!autoComplete) return;

			await client.executeInteraction(interaction, autoComplete);
		}
	},
};
