'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import ROUTES from '~/shared/config/constants/routes';
import ContainedButton from '~/shared/ui/components/buttons/ContainedButton';
import { TFunction } from 'i18next';
import * as z from 'zod';
import { BaseDTO } from '~/shared/model/types/application.types';
import { ServiceActionProps } from '~/shared/model/types/common.types';

interface AuthFormContainerProps<T extends FieldValues, R = unknown> {
  type: 'login' | 'signup';
  children: React.ReactElement<{ formHook: UseFormReturn<T> }>;
  createSchemaFn: (t: TFunction) => z.ZodSchema<T>;
  service: (props: ServiceActionProps<T>) => Promise<BaseDTO<R>>;
}

export default function AuthFormContainer<T extends FieldValues, R = unknown>({
  type,
  children,
  createSchemaFn,
  service
}: AuthFormContainerProps<T, R>) {
  const { t } = useTranslation();
  const router = useRouter();

  const formHook = useForm<T>({
    resolver: zodResolver(createSchemaFn(t))
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = formHook;

  const onSubmit = async (data: T) => {
    const response = await service({ data });
    if (response.success) router.replace(ROUTES.home);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex items-center flex-col gap-4'
    >
      {React.cloneElement(children, { formHook })}

      <div className='absolute -bottom-[18px] bg-dark-main px-7'>
        <ContainedButton type='submit' loading={isSubmitting} loadingPosition='end'>
          {t(`auth.${type}`)}
        </ContainedButton>
      </div>
    </form>
  );
}
