import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import { ClientConstructor } from "../../models/constructors/ClientConstructor.js";
import { InteractionFollowUp } from "../../models/constructors/InteractionConstructor.js";

export default {
	data: new SlashCommandBuilder()
		.setName("commande-test")
		.setDescription("Description de la commande de test")
		.addStringOption((option) =>
			option.setName("autocomplete-test").setDescription("Test de l'autocomplete").setAutocomplete(true),
		),
	async execute(client: ClientConstructor, interaction: ChatInputCommandInteraction) {
		if (interaction.inCachedGuild()) {
			const autocomplete = interaction.options.getString("autocomplete-test");
			if (autocomplete) {
				return new InteractionFollowUp(`Autocomplete : ${autocomplete}`).respond(interaction);
			}

			const rowSelectMenu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
				new StringSelectMenuBuilder()
					.setCustomId("selectmenu-test")
					.setPlaceholder("Aucune valeur sélectionnée")
					.addOptions([
						{
							label: "Choix 1",
							description: "Le choix 1",
							value: "choix_1",
						},
						{
							label: "Choix 2",
							description: "Le choix 2",
							value: "choix_2",
						},
					]),
			);
			const rowButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder().setCustomId("button-test").setLabel("Bouton de test").setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("modal-test")
					.setLabel("Formulaire de test")
					.setStyle(ButtonStyle.Danger),
			);

			await new InteractionFollowUp({
				content: "Select Menu et Bouton de test",
				components: [rowSelectMenu, rowButtons],
			}).respond(interaction);
		}
	},
};
