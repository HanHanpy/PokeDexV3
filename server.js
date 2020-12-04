const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
client.login(process.env.TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

client.on('message', async message => {
    if(message.author.bot) return;
  
  if(message.content.toLowerCase().startsWith('!p') | message.content.toLowerCase().startsWith('!pokemon')){
    const pokemon = message.content.toLowerCase().split(" ")[1];
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => { 
      
      const cap = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
      
      let hp = res.data.stats[0].base_stat
      let atk = res.data.stats[1].base_stat
      let def = res.data.stats[2].base_stat
      let spatk = res.data.stats[3].base_stat
      let spdef = res.data.stats[4].base_stat
      let speed = res.data.stats[5].base_stat
      
      let height = res.data.height/10
      let weight = res.data.weight/10
      
      let name = res.data.name
      let id = res.data.id
      let sprite = res.data.sprites.front_default
      
      let move1 = res.data.moves[0].move.name
      let move2 = res.data.moves[1].move.name
      let move3 = res.data.moves[2].move.name
      let move4 = res.data.moves[3].move.name
      let move5 = res.data.moves[4].move.name
      
      let authorname = message.author.username
      let authoravatar = message.author.displayAvatarURL()
      
      const embed = new Discord.MessageEmbed()      
      .setTitle(`<:masterball:783443157970845757> **N°${id} - ${cap(name)}**`)
      .setDescription('__POKEDEX__')
      .setThumbnail(sprite)
      .addField('**Base Stats**', `**HP:** ${hp} \n**Attack:** ${atk} \n**Defense:** ${def} \n**Sp. Atk:** ${spatk} \n**Sp. Def:** ${spdef} \n**Speed:** ${speed}`, true)
      .addField('**Appearance**', `Height: ${height} m \nWeight: ${weight} kg`, true)
      .addField('**Main Type**', `${cap(res.data.types[0].type.name)}`, true)
      .addField('**Five Moves**', `${cap(move1)}, ${cap(move2)}, ${cap(move3)}, ${cap(move4)}, ${cap(move5)}`, true)
      .setColor('YELLOW')
      .setFooter(`There are no mega or shiny | ${authorname}`, `${authoravatar}`)
      .setTimestamp()
      message.channel.send(embed)
      
    })
    .catch((err) => {
      const noembed = new Discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(`The Pokemon ${pokemon} doesn't exist, If you think this is worng please report this to https://discord.gg/Ap5ytPKQ9g`)
      .setColor('RED')
      message.channel.send(noembed)
      throw(err)
    }) 
  }
  if(message.content.toLowerCase().startsWith('!help')) {
    const helpembed = new Discord.MessageEmbed()
    .setTitle('Available commands')
    .setDescription('!p | !pokemon <pokemon> or <id>')
    .setFooter('More commands will be release later')
    .setColor('YELLOW')
    .setTimestamp()
    message.channel.send(helpembed)
  }
})