# @trellis-app/kobalte-vanilla-extract

Vanilla Extract utils to style Kobalte components easily.

## Installation

```bash
npm install -D @trellis-app/kobalte-vanilla-extract
# or
yarn add -D @trellis-app/kobalte-vanilla-extract
# or
pnpm add -D @trellis-app/kobalte-vanilla-extract
```

> **Note** In order to use these utils you need to configure Vanilla Extract in your project. https://vanilla-extract.style

## Usage

### componentStateStyles

Create vanilla-extract complaint styles for styling data-\* attributes of Kobalte components.

```ts
// styles.css
import { style } from "@vanilla-extract/css";
import { componentStateStyles } from "@trellis-app/kobalte-vanilla-extract";

const button = style([
	{
		background: "blue",
		padding: "2px 6px",
	},
	componentStateStyles({
		disabled: {
			opacity: 0.4,
		},
		invalid: {
			backgroundColor: "red",
			not: {
				backgroundColor: "yellow",
			},
		},
	}),
	componentStateStyles(
		{
			invalid: {
				backgroundColor: "red",
			},
		},
		{ parentSelector: "[data-theme=dark]" },
	),
]);
```

Then apply your styles to the component:

```tsx
import { Button } from "@trellis-app/kobalte-core";
import { button } from "./styles.css";

export const MyButton = () => <Button.Root class={button}>...</Button.Root>;
```

## Documentation

For full documentation, visit [kobalte.dev](https://kobalte.dev/docs/core/overview/styling#using-the-vanilla-extract-plugin).

## Changelog

All notable changes are described in the [CHANGELOG.md](./CHANGELOG.md) file.
