import { Language } from '../../enum/language.enum';

type TRoomErrorMessage = {
  ROOM_NOT_FOUND: string;
  DONT_OWNER_ROOM: string;
  ACCESS_DENIED: string;
  GET_MANY: string;
};

export const RoomErrorMessage: Record<Language, TRoomErrorMessage> = {
  [Language.EN]: {
    ROOM_NOT_FOUND: 'Room not found',
    DONT_OWNER_ROOM:
      "You're not the owner of this room. You cannot edit or delete a room",
    ACCESS_DENIED: 'Access to the room is denied',
    GET_MANY:
      'Room search error. Please check the correctness of your request.',
  },
  [Language.UK]: {
    ROOM_NOT_FOUND: 'Кімната не знайдена',
    DONT_OWNER_ROOM:
      'Ви не власник цієї кімнати. Ви не можете редагувати або видаляти кімнату',
    ACCESS_DENIED: 'Доступ до цієї кімнати заборонено',
    GET_MANY: 'Помилка пошуку кімнат. Перевірте правильність запиту.',
  },
};
