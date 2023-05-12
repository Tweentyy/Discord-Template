import type { SelectMenuInteraction } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";
import { InteractionFollowUp } from "../../models/constructors/InteractionConstructor.js";

export default {
	data: {
		name: "selectmenu-test",
		once: false,
	},
	async execute(client: ClientConstructor, interaction: SelectMenuInteraction) {
		await new InteractionFollowUp(`La valeur sélectionnée est ${interaction.values[0]}`).respond(interaction);
	},
};
