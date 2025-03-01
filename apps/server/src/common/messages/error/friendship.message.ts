import { Language } from '@prisma/client';

type TFriendshipErrorMessage = {
  RECIPIENT_REJECTED: string;
  STATUS_UNKNOWN: string;
  ALREADY_REJECTED: string;
  ALREADY_ACCEPTED: string;
  FRIENDSHIP_NOT_FOUND: string;
};

export const FriendshipErrorMessage: Record<Language, TFriendshipErrorMessage> =
  {
    [Language.EN]: {
      RECIPIENT_REJECTED: 'Recipient rejected your request',
      STATUS_UNKNOWN: 'Friendship status is unknown',
      ALREADY_REJECTED: 'Request already rejected',
      ALREADY_ACCEPTED: 'Request already accepted',
      FRIENDSHIP_NOT_FOUND: 'Friendship request not found',
    },
    [Language.UK]: {
      RECIPIENT_REJECTED: 'Одержувач відхилив ваш запит',
      STATUS_UNKNOWN: 'Статус дружби невідомий',
      ALREADY_REJECTED: 'Запит вже відхилений',
      ALREADY_ACCEPTED: 'Запит вже прийнятий',
      FRIENDSHIP_NOT_FOUND: 'Запит на дружбу не знайдено',
    },
  };
