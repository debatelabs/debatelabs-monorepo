import { Language } from '../../enum/language.enum';

type TRoomSuccessMessage = {
  ALREADY_EXIST_MEMBER: string;
  ADD_MEMBER: string;
};

export const RoomSuccessMessage: Record<Language, TRoomSuccessMessage> = {
  [Language.EN]: {
    ALREADY_EXIST_MEMBER: 'You are already a member of this room.',
    ADD_MEMBER: 'You have been successfully added to the room.',
  },
  [Language.UK]: {
    ALREADY_EXIST_MEMBER: 'Ви вже учасник цієї кімнати.',
    ADD_MEMBER: 'Ви успішно додані в кімнату.',
  },
};
