import type { ModalSubmitInteraction } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";
import { InteractionFollowUp } from "../../models/constructors/InteractionConstructor.js";

export default {
	data: {
		name: "modal-values",
		once: false,
	},
	async execute(client: ClientConstructor, interaction: ModalSubmitInteraction) {
		const fieldValue = interaction.fields.getTextInputValue("champ-de-test");
		await new InteractionFollowUp(`La valeur remplie est ${fieldValue}`).respond(interaction);
	},
};
