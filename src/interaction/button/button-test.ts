import type { ButtonInteraction } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";
import { InteractionFollowUp } from "../../models/constructors/InteractionConstructor.js";

export default {
	data: {
		name: "button-test",
		once: false,
	},
	async execute(client: ClientConstructor, interaction: ButtonInteraction) {
		await new InteractionFollowUp("Le bouton de test fonctionne").respond(interaction);
	},
};
