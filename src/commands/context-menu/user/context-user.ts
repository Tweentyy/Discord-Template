import { ApplicationCommandType } from "discord.js";
import type { UserContextMenuCommandInteraction } from "discord.js";
import type { ClientConstructor } from "../../../models/constructors/ClientConstructor.js";
import { InteractionFollowUp } from "../../../models/constructors/InteractionConstructor.js";

export default {
	data: {
		name: "context-user",
		type: ApplicationCommandType.User,
	},
	async execute(client: ClientConstructor, interaction: UserContextMenuCommandInteraction) {
		await new InteractionFollowUp("Le context menu utilisateur fonctionne").respond(interaction);
	},
};
