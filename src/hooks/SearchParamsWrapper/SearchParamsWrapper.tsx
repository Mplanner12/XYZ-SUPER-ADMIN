// SearchParamsWrapper.tsx
import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface SearchParamsWrapperProps {
  children: (props: { tab: string | null; page: string | null }) => ReactNode;
}

export default function SearchParamsWrapper({ children }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const page = searchParams.get('page');

  return children({ tab, page });
}