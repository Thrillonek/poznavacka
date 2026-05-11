import ColorPickerSettings from '../components/pages/ColorPickerSettings';
import CompletedFileSettings from '../components/pages/CompletedFileSettings';
import KeybindsSettings from '../components/pages/KeybindsSettings';
import ListSettings from '../components/pages/ListSettings';
import OtherSettings from '../components/pages/OtherSettings';
import QuizSettings from '../components/pages/QuizSettings';
import Stats from '../components/pages/Stats';
import SupportSettings from '../components/pages/SupportSettings';

export const nestedCategories = {
	nastavení: {
		kvíz: { component: QuizSettings, icon: 'brain' },
		seznam: { component: ListSettings, icon: 'format-list-bulleted-square' },
		naučené: { component: CompletedFileSettings, icon: 'checkbox-marked-circle-outline' },
		'klávesové zkratky': { component: KeybindsSettings, icon: 'keyboard' },
		vzhled: { component: ColorPickerSettings, icon: 'color' },
		ostatní: { component: OtherSettings, icon: 'slider' },
	},
	informace: {
		podpora: { component: SupportSettings, icon: 'question-mark-circle' },
		statistiky: { component: Stats, icon: 'graph-bar' },
	},
} as const;

export const categories = { ...nestedCategories.nastavení, ...nestedCategories.informace };
