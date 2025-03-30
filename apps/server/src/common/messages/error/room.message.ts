import { Language } from '../../enum/language.enum';

type TRoomErrorMessage = {
  ROOM_NOT_FOUND: string;
  DONT_OWNER_ROOM: string;
  ACCESS_DENIED: string;
  GET_MANY: string;
  ROOM_INVITE_SETTINGS: string;
  ROOM_INVITE_READY: string;
  ROOM_INVITE_PLAYING: string;
  ROOM_INVITE_DONE: string;
  MAX_MEMBERS: string;
};

export const RoomErrorMessage: Record<Language, TRoomErrorMessage> = {
  [Language.EN]: {
    ROOM_NOT_FOUND: 'Room not found',
    DONT_OWNER_ROOM:
      "You're not the owner of this room. You cannot edit or delete a room",
    ACCESS_DENIED: 'Access to the room is denied',
    GET_MANY:
      'Room search error. Please check the correctness of your request.',
    ROOM_INVITE_SETTINGS:
      'You cannot join at this time. The room is being set up.',
    ROOM_INVITE_READY:
      'You cannot join at this time. The owner has stopped recruiting teams.',
    ROOM_INVITE_PLAYING:
      'You cannot join. The room has already begun to debate',
    ROOM_INVITE_DONE: 'The room has already been played.',
    MAX_MEMBERS: 'The room is already full of members.',
  },
  [Language.UK]: {
    ROOM_NOT_FOUND: 'Кімната не знайдена',
    DONT_OWNER_ROOM:
      'Ви не власник цієї кімнати. Ви не можете редагувати або видаляти кімнату',
    ACCESS_DENIED: 'Доступ до цієї кімнати заборонено',
    GET_MANY: 'Помилка пошуку кімнат. Перевірте правильність запиту.',
    ROOM_INVITE_SETTINGS:
      'Ви не можете на разі доєднатися. Кімната в процесі налаштування.',
    ROOM_INVITE_READY:
      'Ви не можете на разі доєднатися. Власник зупинив набір команд.',
    ROOM_INVITE_PLAYING:
      'Ви не можете доєднатися. Кімната вже почала дебатувати',
    ROOM_INVITE_DONE: 'Кімната вже зіграна.',
    MAX_MEMBERS: 'В кімнату вже набрано максимальна кількість учасників.',
  },
};
