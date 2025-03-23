'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseRequestProps<T> {
  fn: () => Promise<T>;
}

export default function useRequest<T>({ fn }: UseRequestProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loading = useMemo(
    () => ({
      start: () => setIsLoading(true),
      stop: () => setIsLoading(false)
    }),
    []
  );

  const getData = useCallback(async () => {
    const response = await fn();
    setData(response);
  }, [fn]);

  useEffect(() => {
    loading.start();
    getData();
    loading.stop();
  }, [getData, loading]);

  return { data, loading, isLoaded: isLoading };
}
