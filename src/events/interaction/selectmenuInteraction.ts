import { Events } from "discord.js";
import type { ClientEvents } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";
import { InteractionFollowUp } from "../../models/constructors/InteractionConstructor.js";

export default {
	data: {
		name: Events.InteractionCreate,
		once: false,
	},
	async execute(client: ClientConstructor, interaction: ClientEvents[Events.InteractionCreate][0]) {
		if (!interaction.isAnySelectMenu()) return;

		if (interaction.inCachedGuild()) {
			if (!client.isReady()) {
				return new InteractionFollowUp("**Erreur :** Le Bot est en train de démarrer").respond(interaction);
			}
			const { customId } = interaction;
			const selectMenu = client.selectMenus.get(customId);
			if (!selectMenu) return;

			await client.executeInteraction(interaction, selectMenu);
		}
	},
};
