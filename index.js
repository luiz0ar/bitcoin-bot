require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl";

client.once('ready', () => {
    console.log(`Bot está online como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '/bitcoin') {
        try {
            const response = await axios.get(API_URL);
            const valorBitcoin = response.data.bitcoin.brl;

            const embed = new EmbedBuilder()
                .setColor(0xff9900)
                .setTitle('💰 Cotação do Bitcoin')
                .setDescription(`O valor atual do **Bitcoin (BTC)** é **R$ ${valorBitcoin.toLocaleString('pt-BR')}**.`)

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erro ao buscar cotação do Bitcoin:', error);
            message.reply('❌ Ocorreu um erro ao buscar a cotação do Bitcoin.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
