const { Client, IntentsBitField } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GOOGLE_API_KEY;
const discordBotToken = process.env.DISCORD_BOT_TOKEN;

const client = new Client({ intents: [
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent,
] });

let model;

async function initializeGenerativeModel() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('AI model initialized successfully');
  } catch (error) {
    console.error('Error initializing AI model:', error);
  }
}

initializeGenerativeModel().then(() => {
  client.login(discordBotToken);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.mentions.has(client.user)) return;

  if (!model) {
    console.error('AI model not initialized');
    return;
  }

  const prompt = message.content.replace(/<@[&!\d]+>? /g, '').trim();
  console.log(prompt);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(`<@${message.author.id}> ${response.text()}`);
    message.channel.send(`<@${message.author.id}> ${response.text()}`);
  } catch (error) {
    console.error('Error generating text:', error);
  }
});
