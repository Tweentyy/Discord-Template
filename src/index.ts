import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { ClientConstructor } from "./models/constructors/ClientConstructor.js";

dotenv.config();

const client = new ClientConstructor({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
	],
});

await client.init();
client.connection(process.env.TOKEN);
