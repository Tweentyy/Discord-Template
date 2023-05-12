import type { AutocompleteInteraction } from "discord.js";
import type { ClientConstructor } from "../../models/constructors/ClientConstructor.js";

export default {
	data: {
		name: "commande-test",
		once: false,
	},
	async execute(client: ClientConstructor, interaction: AutocompleteInteraction) {
		const commandsOptions = [
			{ name: "Test_1", value: "Test_1" },
			{ name: "Test_2", value: "Test_2" },
			{ name: "Test_3", value: "Test_3" },
		];

		await interaction.respond(commandsOptions);
	},
};
