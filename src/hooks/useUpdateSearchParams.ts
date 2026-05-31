'use client';
import { useSearchParams } from 'next/navigation';

export function useUpdateSearchParams() {
	const searchParams = useSearchParams();

	return (updates: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (key && value) params.set(key, value);
		}
		window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
	};
}
