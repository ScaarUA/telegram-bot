import { getPlannedOutages } from '../services/yasno.js';
import bot from '../bot.js';

export const svitloHandler = async (msg, match) => {
  const chatId = msg.chat.id;
  const matchGroup = match[1];

  const plannedOutages = await getPlannedOutages();
  const groups = Object.keys(plannedOutages);

  if (!groups.includes(matchGroup)) {
    return bot.sendMessage(
      chatId,
      `Вкажи правильну групу. Можливі варіанти ${groups.join(', ')}`
    );
  }

  const currentSlot = findCurrentSlot(plannedOutages[matchGroup].today);
  const noElectricity = currentSlot.type === 'Definite';
  const till = minutesToTime(currentSlot.end);
  const message = noElectricity
    ? `Немає світла до ${till}`
    : `Є світло до: ${till}`;

  bot.sendMessage(chatId, message);
};

const getMinutesPassed = () => {
  const now = new Date();

  const kyivTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/Kyiv' })
  );

  const midnightKyiv = new Date(kyivTime);
  midnightKyiv.setHours(0, 0, 0, 0);

  const minutesPassed = Math.floor((kyivTime - midnightKyiv) / (1000 * 60));

  return minutesPassed;
};

const findCurrentSlot = (schedule) => {
  const minutes = getMinutesPassed();
  return schedule.slots.find(
    (slot) => minutes >= slot.start && minutes < slot.end
  );
};

function minutesToTime(minutes) {
  const now = new Date();
  const kyivDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/Kyiv' })
  );

  kyivDate.setHours(0, 0, 0, 0);

  kyivDate.setMinutes(minutes);

  return kyivDate.toLocaleTimeString('en-US', {
    timeZone: 'Europe/Kyiv',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
