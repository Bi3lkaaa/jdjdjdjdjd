const { EmbedBuilder, GuildTextThreadManager, ChannelType } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        const kanal = message.guild.channels.cache.get("1146171676401336380")
        if (message.channel === kanal) {
            const propka = new EmbedBuilder()
                .addFields(
                    {
                        name: '\`🤡\` Nie wierze ale debil',
                        value: `Przyjebal takim textem ze to chuj`
                    },
                    {
                        name: '\`🤣\`A mowa o : ',
                        value: `\`\`\`${message.content}\`\`\``
                    },
                )
                .setColor('#f8ff1f')
            message.delete()
            const msg = await kanal.send({
                embeds: [propka],
            });

            };
        }
    }