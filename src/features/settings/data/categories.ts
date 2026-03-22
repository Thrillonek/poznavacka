import ColorPickerSettings from '../components/pages/ColorPickerSettings';
import GeneralSettings from '../components/pages/GeneralSettings';
import KeybindsSettings from '../components/pages/KeybindsSettings';
import ListSettings from '../components/pages/ListSettings';
import QuizSettings from '../components/pages/QuizSettings';
import Stats from '../components/pages/Stats';
import SupportSettings from '../components/pages/SupportSettings';

export const nestedCategories = {
	nastavení: {
		obecné: { component: GeneralSettings, icon: 'house' },
		kvíz: { component: QuizSettings, icon: 'brain' },
		seznam: { component: ListSettings, icon: 'format-list-bulleted-square' },
		'klávesové zkratky': { component: KeybindsSettings, icon: 'keyboard' },
		vzhled: { component: ColorPickerSettings, icon: 'color' },
	},
	informace: {
		podpora: { component: SupportSettings, icon: 'question-mark-circle' },
		statistiky: { component: Stats, icon: 'graph-bar' },
	},
} as const;

export const categories = { ...nestedCategories.nastavení, ...nestedCategories.informace };
