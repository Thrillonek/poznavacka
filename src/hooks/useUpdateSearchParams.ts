'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useUpdateSearchParams() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (updates: Record<string, string | null>) => {
		const params = new URLSearchParams(Object.fromEntries([...searchParams.entries(), ...Object.entries(updates)].filter(([, v]) => v !== null) as [string, string][]));

		router.push(`${pathname}?${params.toString()}`);
	};
}
