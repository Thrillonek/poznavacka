import { create } from 'zustand';
import type { PresetMenuStore, SettingsStatusStore } from '../types/stores';

export const usePresetMenuStore = create<PresetMenuStore>()((set) => ({
	isPresetMenuOpen: false,
	togglePresetMenu: () => set((state) => ({ isPresetMenuOpen: !state.isPresetMenuOpen })),
}));

export const useSettingsStatusStore = create<SettingsStatusStore>()((set) => ({
	activeRangeValue: undefined,
	activateRange: (type) => set({ activeRangeValue: type }),
	deactivateRange: () => set({ activeRangeValue: undefined }),

	keybindToBeChanged: undefined,
	startChangingKeybinds: (keybind) => set({ keybindToBeChanged: keybind }),
	stopChangingKeybinds: () => set({ keybindToBeChanged: undefined }),

	isModalOpen: false,
	openModal: () => set({ isModalOpen: true }),
	closeModal: () => set({ isModalOpen: false }),
}));
