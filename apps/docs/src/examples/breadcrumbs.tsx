import { Breadcrumbs } from "@trellis-app/kobalte-core/breadcrumbs";

import { ChevronRightIcon } from "../components";
import style from "./breadcrumbs.module.css";

export function BasicExample() {
	return (
		<Breadcrumbs>
			<ol class={style.breadcrumbs__list}>
				<li class={style.breadcrumbs__item}>
					<Breadcrumbs.Link href="/" class={style.breadcrumbs__link}>
						Home
					</Breadcrumbs.Link>
					<Breadcrumbs.Separator class={style.breadcrumbs__separator} />
				</li>
				<li class={style.breadcrumbs__item}>
					<Breadcrumbs.Link href="/components" class={style.breadcrumbs__link}>
						Components
					</Breadcrumbs.Link>
					<Breadcrumbs.Separator class={style.breadcrumbs__separator} />
				</li>
				<li class={style.breadcrumbs__item}>
					<Breadcrumbs.Link current class={style.breadcrumbs__link}>
						Breadcrumbs
					</Breadcrumbs.Link>
				</li>
			</ol>
		</Breadcrumbs>
	);
}

export function CustomSeparatorExample() {
	return (
		<Breadcrumbs separator={<ChevronRightIcon width={20} height={20} />}>
			<ol class={style.breadcrumbs__list}>
				<li class={style.breadcrumbs__item}>
					<Breadcrumbs.Link href="/" class={style.breadcrumbs__link}>
						Home
					</Breadcrumbs.Link>
					<Breadcrumbs.Separator class={style.breadcrumbs__separator} />
				</li>
				<li class={style.breadcrumbs__item}>
					<Breadcrumbs.Link href="/components" class={style.breadcrumbs__link}>
						Components
					</Breadcrumbs.Link>
					<Breadcrumbs.Separator class={style.breadcrumbs__separator} />
				</li>
				<li class={style.breadcrumbs__item}>
					<Breadcrumbs.Link current class={style.breadcrumbs__link}>
						Breadcrumbs
					</Breadcrumbs.Link>
				</li>
			</ol>
		</Breadcrumbs>
	);
}
