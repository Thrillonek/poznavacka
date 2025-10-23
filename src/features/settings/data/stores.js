import { create } from 'zustand';

export const usePresetMenuStore = create((set) => ({
	isPresetMenuOpen: false,
	togglePresetMenu: () => set((state) => ({ isPresetMenuOpen: !state.isPresetMenuOpen })),
}));

export const useRangeComponentStore = create((set) => ({
	activeRangeValue: null,
	activateRange: (type) => set({ activeRangeValue: type }),
	deactivateRange: () => set({ activeRangeValue: false }),
}));
