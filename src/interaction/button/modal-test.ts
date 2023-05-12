import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import type { ButtonInteraction } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: "modal-test",
		once: false,
	},
	async execute(client: ClientConstructor, interaction: ButtonInteraction) {
		const modal = new ModalBuilder().setCustomId("modal-values").setTitle("Formulaire de test");

		const favoriteColorInput = new TextInputBuilder()
			.setCustomId("champ-de-test")
			.setLabel("Quelle est ta couleur préférée ?")
			.setStyle(TextInputStyle.Short);
		const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(favoriteColorInput);
		modal.addComponents(firstActionRow);

		await interaction.showModal(modal);
	},
};
