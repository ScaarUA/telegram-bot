import bot from '../bot.js';
import config from '../config.js';
import { Highlight } from '../db/schemas/index.js';
import { withErrorHandling } from '../helpers/withErrorHandling.js';

let isRegistered = false;

export const monitorNewHighlights = withErrorHandling((leetify) => {
  if (isRegistered) {
    return;
  }

  isRegistered = true;

  setInterval(
    async () => {
      const storedHighlights = await Highlight.find({});

      const highlights = await leetify.getClubHighlights();

      for (const highlight of highlights) {
        if (
          storedHighlights.find(
            (dbHighlight) => dbHighlight.hgId === highlight.id
          )
        ) {
          continue;
        }

        const possibleUrl = highlight.thumbnailUrl
          .replace('thumbs', 'clips')
          .replace(/_thumb.*/, '.mp4');

        const newDbHighlight = new Highlight({ hgId: highlight.id });
        await newDbHighlight.save();

        bot.sendVideo(config.chatId, possibleUrl, {
          caption: `Новий хайлайт від <b>${highlight.username}</b>
<i>${highlight.description}</i>`,
          parse_mode: 'html',
        });
      }
    },
    60 * 2 * 1000
  );
});

export const isHighlightsMonitoringRegistered = (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, isRegistered ? 'Все чікі-пукі' : 'Я відсмоктав');
};
