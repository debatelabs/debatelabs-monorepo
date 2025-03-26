'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseRequestProps<T> {
  action: () => Promise<T>;
}

export default function useRequest<T>({ action }: UseRequestProps<T>) {
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
    loading.start();
    const response = await action();
    setData(response);
    loading.stop();
  }, [action, loading]);

  useEffect(() => {
    void getData();
  }, [getData, loading]);

  return { data, loading, isLoaded: isLoading };
}
