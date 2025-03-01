import { Language } from '@prisma/client';

type TFriendshipSuccessMessage = {
  ALREADY_ACCEPTED: string;
  ALREADY_SENT: string;
  ACCEPTED: string;
  SENT: string;
  ALREADY_REJECTED: string;
  REJECTED: string;
};

export const FriendshipSuccessMessage: Record<
  Language,
  TFriendshipSuccessMessage
> = {
  [Language.EN]: {
    ALREADY_ACCEPTED: 'Friendship already accepted',
    ALREADY_SENT: 'Request has already been sent',
    ACCEPTED: 'Friendship accepted',
    SENT: 'Request successfully sent',
    ALREADY_REJECTED: 'Request already rejected',
    REJECTED: 'Friendship rejected',
  },
  [Language.UK]: {
    ALREADY_ACCEPTED: 'Дружба вже прийнята',
    ALREADY_SENT: 'Запит вже надіслано',
    ACCEPTED: 'Дружба прийнята',
    SENT: 'Запит успішно надіслано',
    ALREADY_REJECTED: 'Запит вже відхилений',
    REJECTED: 'Дружба відхилина',
  },
};
