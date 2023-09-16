const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Wyślij embed botem')
        .addStringOption(opcja =>
            opcja.setName('tytuł')
            .setDescription('Podaj tytuł')
            .setRequired(true)
        )
        .addStringOption(opcja =>
            opcja.setName('opis')
            .setDescription("Podaj opis")
            .setRequired(true)
        )
        .addStringOption(opcja =>
            opcja.setName("image")
            .setDescription('Podaj link do image (opcjonalne)')
            .setRequired(false) // Ustawione na "false", aby parametr był opcjonalny
        )
        .addStringOption(opcja =>
            opcja.setName("footer")
            .setDescription('Podaj footer (opcjonalne)')
            .setRequired(false)
        )
        .addStringOption(opcja =>
            opcja.setName('field_name')
            .setDescription('Podaj nazwe fielda (opcjonalne)')
            .setRequired(false)
        )
        .addStringOption(opcja =>
            opcja.setName('field_value')
            .setDescription("Podaj wartość fielda (opcjonalne)")
            .setRequired(false)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: 'Nie masz do tego permisji!', ephemeral: true});

        const title = interaction.options.getString("tytuł");
        const description = interaction.options.getString("opis");
        const footer = interaction.options.getString("footer");
        const field_name = interaction.options.getString("field_name");
        const field_value = interaction.options.getString("field_value");
        const image = interaction.options.getString("image") || null; // Ustawienie wartości na null, jeśli nie podano linku do obrazka

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setImage(image)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setColor('#7606ff')

        if (footer) embed.setFooter({text: footer})
        if (field_name && !field_value) return interaction.reply({content: 'Jak podajesz field_name to musisz podać i field_value!', ephemeral: true});
        if (!field_name && field_value) return interaction.reply({content: 'Jak podajesz field_value to musisz podać i field_name!', ephemeral: true});
        if (field_name && field_value) embed.addFields({name: field_name, value: field_value});
        
        interaction.reply({content: 'Wysłałeś embed', ephemeral: true});
        return interaction.channel.send({embeds: [embed]});
    }
}
