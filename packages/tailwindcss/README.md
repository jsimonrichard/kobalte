# @trellis-app/kobalte-tailwindcss

A TailwindCSS plugin for styling Kobalte components with `data-*` attributes by using modifiers like `ui-expanded:*`.

## Installation

```bash
npm install -D @trellis-app/kobalte-tailwindcss
# or
yarn add -D @trellis-app/kobalte-tailwindcss
# or
pnpm add -D @trellis-app/kobalte-tailwindcss
```

## Usage

Add the plugin to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	theme: {
		extend: {},
	},
	plugins: [
		// default prefix is "ui"
		require("@trellis-app/kobalte-tailwindcss"),

		// or with a custom prefix:
		require("@trellis-app/kobalte-tailwindcss")({ prefix: "kb" }),
	],
};
```

Style your component:

```tsx
import { Popover } from "@trellis-app/kobalte-core";

export const MyPopover = () => (
	<Popover>
		<Popover.Trigger class="ui-disabled:bg-slate-100">Open</Popover.Trigger>
		<Popover.Content class="ui-expanded:shadow-md">...</Popover.Content>
	</Popover>
);
```

You can use the following modifiers:

| Modifier               | Inverse modifier           |
| :--------------------- | :------------------------- |
| `ui-valid`             | `ui-not-valid`             |
| `ui-invalid`           | `ui-not-invalid`           |
| `ui-required`          | `ui-not-required`          |
| `ui-disabled`          | `ui-not-disabled`          |
| `ui-readonly`          | `ui-not-readonly`          |
| `ui-checked`           | `ui-not-checked`           |
| `ui-indeterminate`     | `ui-not-indeterminate`     |
| `ui-selected`          | `ui-not-selected`          |
| `ui-pressed`           | `ui-not-pressed`           |
| `ui-expanded`          | `ui-not-expanded`          |
| `ui-highlighted`       | `ui-not-highlighted`       |
| `ui-current`           | `ui-not-current`           |
| `ui-placeholder-shown` | `ui-not-placeholder-shown` |

It's also possible to use _inverse modifiers_ in the form of `ui-not-*`, _group and peer modifiers_ in the form of `ui-group-*` and `ui-peer-*`.

## Documentation

For full documentation, visit [kobalte.dev](https://kobalte.dev/docs/core/overview/styling#using-the-tailwindcss-plugin).

## Acknowledgment

This plugin is an adaptation of [@headlessui/tailwindcss](https://github.com/tailwindlabs/headlessui), MIT Licensed, Copyright (c) 2020 Tailwind Labs.

## Changelog

All notable changes are described in the [CHANGELOG.md](./CHANGELOG.md) file.
