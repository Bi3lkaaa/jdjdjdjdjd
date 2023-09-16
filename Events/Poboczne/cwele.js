const { EmbedBuilder, GuildTextThreadManager, ChannelType } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        const kanal = message.guild.channels.cache.get("1141748552322781244")
        if (message.channel === kanal) {
            const propka = new EmbedBuilder()
                .addFields(
                    {
                        name: '\`👥\` Nowy cwel na liscie!',
                        value: `By go chuj trzelił`
                    },
                    {
                        name: '\`😡\` Cwel o nicku:',
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