import { mergeDefaultProps } from "@kobalte/utils";
import {
	Show,
	ValidComponent,
	createEffect,
	onCleanup,
	splitProps,
} from "solid-js";

import { Polymorphic, PolymorphicProps } from "../polymorphic";
import {
	FormControlDataSet,
	useFormControlContext,
} from "./form-control-context";

export interface FormControlErrorMessageOptions {
	/**
	 * Used to force mounting when more control is needed.
	 * Useful when controlling animation with SolidJS animation libraries.
	 */
	forceMount?: boolean;
}

export interface FormControlErrorMessageCommonProps {
	id: string;
}

export interface FormControlErrorMessageRenderProps
	extends FormControlErrorMessageCommonProps,
		FormControlDataSet {}

export type FormControlErrorMessageProps = FormControlErrorMessageOptions &
	Partial<FormControlErrorMessageCommonProps>;

/**
 * The error message that gives the user information about how to fix a validation error on the form control.
 */
export function FormControlErrorMessage<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, FormControlErrorMessageProps>,
) {
	const context = useFormControlContext();

	const mergedProps = mergeDefaultProps(
		{
			id: context.generateId("error-message"),
		},
		props as FormControlErrorMessageProps,
	);

	const [local, others] = splitProps(mergedProps, ["forceMount"]);

	const isInvalid = () => context.validationState() === "invalid";

	createEffect(() => {
		if (!isInvalid()) {
			return;
		}

		onCleanup(context.registerErrorMessage(others.id!));
	});

	return (
		<Show when={local.forceMount || isInvalid()}>
			<Polymorphic<FormControlErrorMessageRenderProps>
				as="div"
				{...context.dataset()}
				{...others}
			/>
		</Show>
	);
}
