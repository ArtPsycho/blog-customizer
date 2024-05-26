import { useCallback, useRef, useState, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import {
	OptionType,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'components/arrow-button';
import { Text } from '../text/Text';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Button } from 'components/button';
import { useCloseForm } from './hook/useCloseForm';

type ArticleParamsFormProps = {
	fontFamily: (select: OptionType) => void;
	fontSize: (select: OptionType) => void;
	fontColor: (select: OptionType) => void;
	backgroundColor: (select: OptionType) => void;
	contentWidth: (select: OptionType) => void;
	resetButton: () => void;
	applyButton: (event: FormEvent) => void;
	appState: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);

	const toggleForm = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	useCloseForm({
		isOpen: open,
		onClose: () => setOpen,
		rootRef: ref,
	});

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={open} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={props.applyButton}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={props.appState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={props.fontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={props.appState.fontSizeOption}
						onChange={props.fontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={props.appState.fontColor}
						options={fontColors}
						onChange={props.fontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={props.appState.backgroundColor}
						options={backgroundColors}
						onChange={props.backgroundColor}
						title='Цвет фона'
					/>
					<Select
						selected={props.appState.contentWidth}
						options={contentWidthArr}
						onChange={props.contentWidth}
						title='Ширина контента'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='reset' onClick={props.resetButton} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
