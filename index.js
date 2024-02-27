const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js')

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
	intents:[Guilds, GuildMembers, GuildMessages],
	partials:[User, Message, GuildMember, ThreadMember]
})

const { loadEvents } = require('./Handlers/eventHandler.js');
const { loadButtons } = require('./Handlers/buttonHandler.js')


client.config = require('./config.json');
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

loadEvents(client)
loadButtons(client)

require('./Handlers/anti-crash.js')(client)

client.login(client.config.token)

