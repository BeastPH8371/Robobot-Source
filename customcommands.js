const parts = message.content.split(' ');

if(parts[0] === '!hello') {
    message.reply('hi');
}
if(parts[0] === '?work') {
    message.reply('ok that is it');
}