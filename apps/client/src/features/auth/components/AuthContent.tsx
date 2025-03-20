import React from 'react';
import AuthFormContainer from '../containers/AuthFormContainer';
import ExternalAuthSection from './ExternalAuthSection';
import ContainedButton from '~/shared/components/buttons/ContainedButton';

interface AuthContentProps {
  children: React.ReactNode;
  type: 'login' | 'signup';
}

export function AuthContent({ children, type }: AuthContentProps) {
  return (
    <div className='flex-center flex-col gap-14'>
      <div className='flex-center flex-col relative'>
        <h2 className='bg-dark text-3xl absolute z-10 px-7 -top-5'>
          {type === 'login' && 'Вхід до аккаунту'}
          {type === 'signup' && 'Реєстрація'}
        </h2>
        <div className='w-[500px] h-fit border-4 border-primary flex-center flex-col rounded-[4px] px-16 py-14'>
          <div className='w-full flex-center flex-col gap-6'>
            <ExternalAuthSection />
            <div className='flex-center relative w-1/2'>
              <div className='w-full h-[1px] absolute bg-primary'></div>
              <span className='bg-dark z-10 relative px-4'>або</span>
            </div>
            <AuthFormContainer>{children}</AuthFormContainer>
          </div>
        </div>
        <div className='absolute -bottom-[18px] bg-dark px-7'>
          <ContainedButton>Submit</ContainedButton>
        </div>
      </div>
      <p>
        Немає акаунту?{' '}
        <span className='text-primary cursor-pointer'>
          {type === 'login' && 'Вхід'}
          {type === 'signup' && 'Зареєструватися'}
        </span>
      </p>
    </div>
  );
}
