import type { BaseMessageOptions, InteractionResponse, Message, RepliableInteraction } from "discord.js";

class InteractionConstructor {
	content?: BaseMessageOptions["content"];
	embeds?: BaseMessageOptions["embeds"];
	files?: BaseMessageOptions["files"];
	components?: BaseMessageOptions["components"];

	constructor(data: string | BaseMessageOptions) {
		if (typeof data === "object") {
			this.content = data.content;
			this.embeds = data.embeds;
			this.files = data.files;
			this.components = data.components;
		} else {
			this.content = data;
		}
	}
}

export class InteractionFollowUp extends InteractionConstructor {
	constructor(data: string | BaseMessageOptions) {
		super(data);
	}

	async respond(interaction: RepliableInteraction, automaticDeletion: boolean = true): Promise<Message> {
		if (!interaction.deferred) await interaction.deferReply({ ephemeral: true });

		const followUp = interaction.followUp({
			content: this.content,
			embeds: this.embeds,
			components: this.components,
			files: this.files,
			ephemeral: true,
		});

		if (automaticDeletion) {
			setTimeout(() => {
				try {
					interaction.deleteReply();
				} catch {}
			}, 60 * 1000);
		}
		return followUp;
	}
}

export class InteractionReply extends InteractionConstructor {
	constructor(data: BaseMessageOptions) {
		super(data);
	}

	async respond(interaction: RepliableInteraction, automaticDeletion: boolean = true): Promise<InteractionResponse> {
		if (!interaction.deferred) await interaction.deferReply({ ephemeral: true });

		const reply = interaction.reply({
			content: this.content,
			embeds: this.embeds,
			components: this.components,
			files: this.files,
			ephemeral: true,
		});

		if (automaticDeletion) {
			setTimeout(() => {
				try {
					interaction.deleteReply();
				} catch {}
			}, 60 * 1000);
		}
		return reply;
	}
}
