import { ApplicationCommandType } from "discord.js";
import type { MessageContextMenuCommandInteraction } from "discord.js";
import { ClientConstructor } from "../../../models/constructors/ClientConstructor.js";
import { InteractionFollowUp } from "../../../models/constructors/InteractionConstructor.js";

export default {
	data: {
		name: "context-message",
		type: ApplicationCommandType.Message,
	},
	async execute(client: ClientConstructor, interaction: MessageContextMenuCommandInteraction) {
		await new InteractionFollowUp("Le context menu message fonctionne").respond(interaction);
	},
};
