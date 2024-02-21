const fs = require('fs');

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync('config.json', 'utf8'));
  } catch (error) {
    console.error('Error loading config:', error.message);
    return {};
  }
}
function saveConfig(config) {
  try {
    fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Error saving config:', error.message);
  }
}

module.exports = {
  config: {
    name: "titletext",
    aliases: ["titleset", "title", "settitle"],
    version: "1.0",
    author: "Liane",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Set the title of the bot's response"
    },
    longDescription: {
      en: "Set the title of the bot's response, only available in Mocha GoatbotV2"
    },
    category: "owner",
    guide: {
      en: "   {pn} [text | font | contentfont] <text>: Change your title text."
    }
  },

  langs: {
    en: {
      incompatible: "❌ | This command is only available in Mocha GoatbotV2",
      successText: "✅ | Successfully set the title text to:\n'%1'",
      successFont: "✅ | Successfully set the title font to:\n'%1'",
      failed: "❌ | Failed to set any changes to title."
    }
  },

  onStart: async function ({ message, usersData, event, args, getLang }) {
    try {
      const config = loadConfig();
      if (!config.lianeAPI) {
        return message.reply(getLang("incompatible "));
      }
      switch (args[0]) {
        case "text":
          if (args[1]) {
            config.lianeAPI.title = args.slice(1).join(" ");
            saveConfig(config);
            message.reply(getLang("successText", config.lianeAPI.title));
          } else {
            message.SyntaxError();
          }
          break;

        case "font":
          if (args[1]) {
            config.lianeAPI.titleFont = args.slice(1).join(" ");
            saveConfig(config);
            message.reply(getLang("successFont", config.lianeAPI.titleFont));
          } else {
            message.SyntaxError();
          }
          break;
          case "contentfont":
          if (args[1]) {
            config.lianeAPI.contentFont = args.slice(1).join(" ");
            saveConfig(config);
            message.reply(getLang("successFont", config.lianeAPI.contentFont));
          } else {
            message.SyntaxError();
          }
          break;
          
        default:
          message.SyntaxError();
          break;
      }
    } catch (error) {
      console.error(error);
      message.reply(getLang("failed"));
    }
  }
};
