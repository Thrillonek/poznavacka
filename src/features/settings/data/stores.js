import { create } from 'zustand';

export const usePresetMenuStore = create((set) => ({
	isPresetMenuOpen: false,
	togglePresetMenu: () => set((state) => ({ isPresetMenuOpen: !state.isPresetMenuOpen })),
}));

export const useSettingsStatusStore = create((set) => ({
	activeRangeValue: null,
	activateRange: (type) => set({ activeRangeValue: type }),
	deactivateRange: () => set({ activeRangeValue: false }),

	keybindToBeChanged: false,
	startChangingKeybinds: (keybind) => set((state) => ({ keybindToBeChanged: keybind })),
	stopChangingKeybinds: () => set({ keybindToBeChanged: null }),
}));
