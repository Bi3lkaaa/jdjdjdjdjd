const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clearuje chat")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption(option =>
            option.setName('ilość')
                .setDescription("Podaj ilość wiadomości")
                .setRequired(true)
        ),
    async execute(interaction) {
        const ilość = interaction.options.getNumber("ilość");
        
        const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
        const messagesToDelete = await interaction.channel.messages.fetch({ limit: ilość });
        const messagesToDeleteFiltered = messagesToDelete.filter(message => message.createdTimestamp > twoWeeksAgo);

        if (messagesToDeleteFiltered.size === 0) {
            return interaction.reply({
                content: "Nie znaleziono żadnych wiadomości do usunięcia w ciągu ostatnich 14 dni.",
                ephemeral: true
            });
        }

        await interaction.channel.bulkDelete(messagesToDeleteFiltered, true);

        const embed = new EmbedBuilder()
            .setDescription(`**Usunięto**: ${messagesToDeleteFiltered.size} wiadomości`)
            .setColor('#7606ff')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};