import { Component, ComponentProps, ValidComponent, mergeProps } from "solid-js";
import { Polymorphic } from "../polymorphic";

export type ResolvePropsCallback<
  T extends ValidComponent,
  ExtraProps extends {} = {},
> = (
  props: Omit<ComponentProps<T>, keyof ExtraProps> & Partial<ComponentProps<T>>,
  extraProps: ExtraProps,
) => Partial<ComponentProps<T>>;

export function withProps<
  T extends ValidComponent,
  ExtraPropInputs extends {} = {},
  ExtraProps extends {} = {},
>(
  Comp: T,
  extraProps:
    | ExtraProps
    | ((props: ExtraPropInputs & Partial<ComponentProps<T>>) => ExtraProps),
  excludeFromComponentProps: (keyof ExtraPropInputs)[] = [],
  resolveProps?: ResolvePropsCallback<T, ExtraProps>,
) {
  return <U extends ValidComponent>(
    props: Omit<ComponentProps<T>, keyof ExtraProps> &
      Partial<ComponentProps<T>> & {
        as?: Component<ComponentProps<T> & ComponentProps<U>>;
      } & ComponentProps<U> &
      ExtraPropInputs,
  ) => {
    let filteredProps: Omit<ComponentProps<T>, keyof ExtraProps> &
      Partial<ComponentProps<T>> & {
        as?: Component<ComponentProps<T> & ComponentProps<U>>;
      } & ComponentProps<U> = { ...props };

    if (extraProps instanceof Function) {
      extraProps = extraProps(props);
      // Clean props
      for (const key of excludeFromComponentProps) {
        delete filteredProps[key];
      }
    }

    let dynamicProps = {};
    if (resolveProps) {
      dynamicProps = resolveProps(filteredProps, extraProps);
    }

    const totalProps = mergeProps(extraProps, props, dynamicProps);
    return <Polymorphic as={props.as ?? Comp} {...totalProps} />;
  };
}
