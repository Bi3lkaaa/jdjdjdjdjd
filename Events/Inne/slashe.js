const { ms } = require('ms');
const { Collection, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',

    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) {
            return
        } else {

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            interaction.reply({
                content: 'Ta komenda nie działa'
            })
        }

        if (!client.cooldowns.has(command.data.name)) {
            client.cooldowns.set(command.data.name, new Collection());
        }
    
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
    
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                const embed = new EmbedBuilder()
                .setDescription(`Musisz odczekać przed użyciem tej komendy!`)
                .setColor('#7606ff')
                return interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        command.execute(interaction, client)}
    },
}