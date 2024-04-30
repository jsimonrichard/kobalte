/*!
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/6b51339cca0b8344507d3c8e81e7ad05d6e75f9b/packages/@react-aria/separator/src/useSeparator.ts
 */

import { Orientation, mergeDefaultProps, mergeRefs } from "@kobalte/utils";
import { ValidComponent, splitProps } from "solid-js";

import { Polymorphic, PolymorphicProps } from "../polymorphic";
import { createTagName } from "../primitives";

export interface SeparatorRootOptions {
	/** The orientation of the separator. */
	orientation?: Orientation;
}

export interface SeparatorRootCommonProps {
	ref: HTMLElement | ((el: HTMLElement) => void);
}

export interface SeparatorRootRenderProps extends SeparatorRootCommonProps {
	role: "separator" | undefined;
	"aria-orientation": "vertical" | undefined;
	"data-orientation": Orientation | undefined;
}

export type SeparatorRootProps = SeparatorRootOptions &
	Partial<SeparatorRootCommonProps>;

/**
 * A separator visually or semantically separates content.
 */
export function SeparatorRoot<T extends ValidComponent = "hr">(
	props: PolymorphicProps<T, SeparatorRootProps>,
) {
	let ref: HTMLElement | undefined;

	const mergedProps = mergeDefaultProps(
		{
			orientation: "horizontal",
		},
		props as SeparatorRootProps,
	);

	const [local, others] = splitProps(mergedProps, ["ref", "orientation"]);

	const tagName = createTagName(
		() => ref,
		() => "hr",
	);

	return (
		<Polymorphic<SeparatorRootRenderProps>
			as="hr"
			ref={mergeRefs((el) => (ref = el), local.ref)}
			role={tagName() !== "hr" ? "separator" : undefined}
			aria-orientation={
				local.orientation === "vertical" ? "vertical" : undefined
			}
			data-orientation={local.orientation}
			{...others}
		/>
	);
}
