import { CSSProperties, FormEvent, useState } from 'react';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from '../../constants/articleProps';

export const App = () => {
	const [appState, setAppState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] = useState(defaultArticleState);

	// Шрифт текста
	const fontFamily = (selected: OptionType) => {
		setAppState({ ...appState, fontFamilyOption: selected });
	};

	// Размер шрифта
	const fontSize = (selected: OptionType) => {
		setAppState({ ...appState, fontSizeOption: selected });
	};

	// Цвет текста
	const fontColor = (selected: OptionType) => {
		setAppState({ ...appState, fontColor: selected });
	};

	// Цвет фона
	const backgoundColor = (selected: OptionType) => {
		setAppState({ ...appState, backgroundColor: selected });
	};

	// Ширина отображения контента
	const contentWidth = (selected: OptionType) => {
		setAppState({ ...appState, contentWidth: selected });
	};

	//Сбрасывание параметров
	const resetState = () => {
		setFormState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	// Подтверждение параматеров
	const applyState = (event: FormEvent) => {
		event.preventDefault();
		setFormState(appState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
					'--font-color': formState.fontColor.value,
					'--background-color': formState.backgroundColor.value,
					'--content-width': formState.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={fontFamily}
				fontSize={fontSize}
				fontColor={fontColor}
				backgroundColor={backgoundColor}
				contentWidth={contentWidth}
				resetButton={resetState}
				applyButton={applyState}
				appState={appState}
			/>
			<Article />
		</main>
	);
};
