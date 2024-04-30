import { focusWithoutScrolling, mergeRefs } from "@kobalte/utils";
import { Component, JSX, Show, ValidComponent, splitProps } from "solid-js";

import createPreventScroll from "solid-prevent-scroll";
import {
	DismissableLayer,
	DismissableLayerCommonProps,
	DismissableLayerRenderProps,
} from "../dismissable-layer";
import { PolymorphicProps } from "../polymorphic";
import { PopperPositioner } from "../popper";
import {
	FocusOutsideEvent,
	InteractOutsideEvent,
	PointerDownOutsideEvent,
	createFocusScope,
	createHideOutside,
} from "../primitives";
import { ComboboxDataSet, useComboboxContext } from "./combobox-context";

export interface ComboboxContentOptions {
	/**
	 * Event handler called when focus moves to the trigger after closing.
	 * It can be prevented by calling `event.preventDefault`.
	 */
	onCloseAutoFocus?: (event: Event) => void;

	/**
	 * Event handler called when a pointer event occurs outside the bounds of the component.
	 * It can be prevented by calling `event.preventDefault`.
	 */
	onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;

	/**
	 * Event handler called when the focus moves outside the bounds of the component.
	 * It can be prevented by calling `event.preventDefault`.
	 */
	onFocusOutside?: (event: FocusOutsideEvent) => void;

	/**
	 * Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component.
	 * It can be prevented by calling `event.preventDefault`.
	 */
	onInteractOutside?: (event: InteractOutsideEvent) => void;
}

export interface ComboboxContentCommonProps
	extends DismissableLayerCommonProps {
	/** The HTML styles attribute (object form only). */
	style?: JSX.CSSProperties;
}

export interface ComboboxContentRenderProps
	extends ComboboxContentCommonProps,
		DismissableLayerRenderProps,
		ComboboxDataSet {}

export type ComboboxContentProps = ComboboxContentOptions &
	Partial<ComboboxContentCommonProps>;

/**
 * The component that pops out when the combobox is open.
 */
export function ComboboxContent<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ComboboxContentProps>,
) {
	let ref: HTMLElement | undefined;

	const context = useComboboxContext();

	const [local, others] = splitProps(props as ComboboxContentProps, [
		"ref",
		"style",
		"onCloseAutoFocus",
		"onFocusOutside",
	]);

	const close = () => {
		context.resetInputValue(
			context.listState().selectionManager().selectedKeys(),
		);
		context.close();
	};

	const onFocusOutside = (e: FocusOutsideEvent) => {
		local.onFocusOutside?.(e);

		// When focus is trapped (in modal mode), a `focusout` event may still happen.
		// We make sure we don't trigger our `onDismiss` in such case.
		if (context.isOpen() && context.isModal()) {
			e.preventDefault();
		}
	};

	// aria-hide everything except the content (better supported equivalent to setting aria-modal)
	createHideOutside({
		isDisabled: () => !(context.isOpen() && context.isModal()),
		targets: () => {
			const excludedElements = [];

			if (ref) {
				excludedElements.push(ref);
			}

			const controlEl = context.controlRef();
			if (controlEl) {
				excludedElements.push(controlEl);
			}

			return excludedElements;
		},
	});

	createPreventScroll({
		element: () => ref ?? null,
		enabled: () => context.isOpen() && context.preventScroll(),
	});

	createFocusScope(
		{
			trapFocus: () => context.isOpen() && context.isModal(),
			onMountAutoFocus: (e) => {
				// We prevent open autofocus because it's handled by the `Listbox`.
				e.preventDefault();
			},
			onUnmountAutoFocus: (e) => {
				local.onCloseAutoFocus?.(e);

				if (!e.defaultPrevented) {
					focusWithoutScrolling(context.inputRef());
					e.preventDefault();
				}
			},
		},
		() => ref,
	);

	return (
		<Show when={context.contentPresence.isPresent()}>
			<PopperPositioner>
				<DismissableLayer<
					Component<
						Omit<ComboboxContentRenderProps, keyof DismissableLayerRenderProps>
					>
				>
					ref={mergeRefs((el) => {
						context.setContentRef(el);
						context.contentPresence.setRef(el);
						ref = el;
					}, local.ref)}
					disableOutsidePointerEvents={context.isModal() && context.isOpen()}
					excludedElements={[context.controlRef]}
					style={{
						"--kb-combobox-content-transform-origin":
							"var(--kb-popper-content-transform-origin)",
						position: "relative",
						...local.style,
					}}
					onFocusOutside={onFocusOutside}
					onDismiss={close}
					{...context.dataset()}
					{...others}
				/>
			</PopperPositioner>
		</Show>
	);
}
