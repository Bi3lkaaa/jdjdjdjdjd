const { EmbedBuilder, GuildTextThreadManager, ChannelType } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        const kanal = message.guild.channels.cache.get("1145455042661453855")
        if (message.channel === kanal) {
            const propka = new EmbedBuilder()
                .addFields(
                    {
                        name: '\`👼\` Nowy wielbiciel',
                        value: `Potężnego konta szerszen`
                    },
                    {
                        name: '\`🤡\` A wabi się on : ',
                        value: `\`\`\`${message.content}\`\`\``
                    },
                )
                .setColor('#FF5000')
            message.delete()
            const msg = await kanal.send({
                embeds: [propka],
            });

            };
        }
    }