import {
  checkAccessibility,
  installPointerEvent,
  itIsPolymorphic,
  itRendersChildren,
  itSupportsClass,
  itSupportsRef,
  itSupportsStyle,
} from "@kobalte/tests";
import { fireEvent, render, screen } from "solid-testing-library";

import { ToggleButton, ToggleButtonProps } from "./toggle-button";

const defaultProps: ToggleButtonProps = {};

describe("ToggleButton", () => {
  installPointerEvent();

  checkAccessibility([<ToggleButton>Button</ToggleButton>]);
  itIsPolymorphic(ToggleButton as any, defaultProps);
  itRendersChildren(ToggleButton as any, defaultProps);
  itSupportsClass(ToggleButton as any, defaultProps);
  itSupportsRef(ToggleButton as any, defaultProps, HTMLButtonElement);
  itSupportsStyle(ToggleButton as any, defaultProps);

  it("can be default selected (uncontrolled)", () => {
    render(() => (
      <ToggleButton data-testid="toggle" defaultIsSelected>
        Button
      </ToggleButton>
    ));

    const toggle = screen.getByTestId("toggle");

    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-selected");
  });

  it("can be controlled", async () => {
    const onChangeSpy = jest.fn();

    render(() => (
      <ToggleButton data-testid="toggle" isSelected onSelectedChange={onChangeSpy}>
        Button
      </ToggleButton>
    ));

    const toggle = screen.getByTestId("toggle");

    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-selected");

    fireEvent.click(toggle);
    await Promise.resolve();

    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-selected");
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith(false);
  });

  it("should have correct attributes when the toggle button is off (not selected)", () => {
    render(() => <ToggleButton data-testid="toggle">Button</ToggleButton>);

    const toggle = screen.getByTestId("toggle");

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).not.toHaveAttribute("data-selected");
  });

  it("should have correct attributes when the toggle button is on (selected)", () => {
    render(() => (
      <ToggleButton data-testid="toggle" isSelected>
        Button
      </ToggleButton>
    ));

    const toggle = screen.getByTestId("toggle");

    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-selected");
  });
});