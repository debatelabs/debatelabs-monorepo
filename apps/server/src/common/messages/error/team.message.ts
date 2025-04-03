import { Language } from '../../enum/language.enum';

type TTeamErrorMessage = {
  TEAM_NOT_FOUND: string;
  DONT_OWNER_ROOM: string;
};

export const TeamErrorMessage: Record<Language, TTeamErrorMessage> = {
  [Language.EN]: {
    TEAM_NOT_FOUND: 'Team not found',
    DONT_OWNER_ROOM:
      "You're not the owner of this room. You cannot edit or delete a room",
  },
  [Language.UK]: {
    TEAM_NOT_FOUND: 'Команда не знайдена',
    DONT_OWNER_ROOM:
      'Ви не власник цієї кімнати. Ви не можете редагувати або видаляти команди',
  },
};
