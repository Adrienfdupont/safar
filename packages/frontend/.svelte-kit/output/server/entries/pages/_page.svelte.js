import { b as escape_html, i as head, r as ensure_array_like, t as attr_class, y as attr } from "../../chunks/server.js";
//#region src/lib/calendar.svelte.ts
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var PERSIAN_MONTHS = [
	"Farvardin",
	"Ordibehesht",
	"Khordad",
	"Tir",
	"Mordad",
	"Shahrivar",
	"Mehr",
	"Aban",
	"Azar",
	"Dey",
	"Bahman",
	"Esfand"
];
function gregorianToPersian(date) {
	const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	}).formatToParts(date);
	let year = 0, month = 0, day = 0;
	for (const p of parts) {
		if (p.type === "year") year = parseInt(p.value, 10);
		if (p.type === "month") month = parseInt(p.value, 10) - 1;
		if (p.type === "day") day = parseInt(p.value, 10);
	}
	return {
		year,
		month,
		day
	};
}
var DAY_NAMES = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
function getDayNames() {
	return DAY_NAMES;
}
var CalendarState = class {
	currentDate = /* @__PURE__ */ new Date();
	constructor() {}
	get year() {
		return this.currentDate.getFullYear();
	}
	get month() {
		return this.currentDate.getMonth();
	}
	get monthName() {
		return MONTHS[this.month];
	}
	get persianInfo() {
		const firstDay = gregorianToPersian(new Date(this.year, this.month, 1));
		const lastDay = gregorianToPersian(new Date(this.year, this.month + 1, 0));
		const months = /* @__PURE__ */ new Set();
		const years = /* @__PURE__ */ new Set();
		months.add(firstDay.month);
		years.add(firstDay.year);
		if (lastDay.month !== firstDay.month) {
			months.add(lastDay.month);
			years.add(lastDay.year);
		}
		const monthNames = [...months].sort((a, b) => a - b).map((m) => PERSIAN_MONTHS[m]);
		years.size === 1 ? `${firstDay.year}` : `${firstDay.year}${lastDay.year}`;
		return {
			year: firstDay.year,
			monthNames: monthNames.map((n) => `${n}`)
		};
	}
	get days() {
		const y = this.year;
		const m = this.month;
		let startDow = new Date(y, m, 1).getDay() - 1;
		if (startDow < 0) startDow = 6;
		const gridStart = new Date(y, m, 1 - startDow);
		const today = /* @__PURE__ */ new Date();
		const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
		const result = [];
		for (let i = 0; i < 42; i++) {
			const d = new Date(gridStart);
			d.setDate(gridStart.getDate() + i);
			const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
			const persian = gregorianToPersian(d);
			result.push({
				date: d,
				day: d.getDate(),
				persianDay: persian.day,
				isToday: dateStr === todayStr,
				isCurrentMonth: d.getMonth() === m && d.getFullYear() === y
			});
		}
		return result;
	}
	goToPrevMonth() {
		this.currentDate = new Date(this.year, this.month - 1, 1);
	}
	goToNextMonth() {
		this.currentDate = new Date(this.year, this.month + 1, 1);
	}
	goToToday() {
		this.currentDate = /* @__PURE__ */ new Date();
	}
	goToMonth(y, m) {
		this.currentDate = new Date(y, m, 1);
	}
	static MONTHS = MONTHS;
	static PERSIAN_MONTHS = PERSIAN_MONTHS;
};
//#endregion
//#region src/lib/components/CalendarHeader.svelte
function CalendarHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { year, month, goToMonth, MONTHS } = $$props;
		$$renderer.push(`<nav class="month-strip svelte-za6my5" aria-label="Month selector"><!--[-->`);
		const each_array = ensure_array_like(MONTHS);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let name = each_array[i];
			const isCurrent = i === month;
			$$renderer.push(`<button${attr_class("month-chip svelte-za6my5", void 0, { "active": isCurrent })}${attr("aria-current", isCurrent ? "page" : void 0)}><span class="month-short svelte-za6my5">${escape_html(name.slice(0, 3))}</span> <span class="month-full svelte-za6my5">${escape_html(name)}</span></button>`);
		}
		$$renderer.push(`<!--]--></nav>`);
	});
}
//#endregion
//#region src/lib/components/Calendar.svelte
function Calendar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const state = new CalendarState();
		const dayNames = getDayNames();
		$$renderer.push(`<div class="calendar-wrapper svelte-1iu5iby">`);
		CalendarHeader($$renderer, {
			year: state.year,
			month: state.month,
			goToMonth: (y, m) => state.goToMonth(y, m),
			MONTHS: CalendarState.MONTHS
		});
		$$renderer.push(`<!----> <div class="calendar-toolbar svelte-1iu5iby"><button class="nav-btn svelte-1iu5iby" aria-label="Previous month"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button> <h2 class="current-month svelte-1iu5iby"><span class="gregorian svelte-1iu5iby">${escape_html(state.monthName)} ${escape_html(state.year)}</span> <span class="persian svelte-1iu5iby">${escape_html(state.persianInfo.monthNames.join(" / "))} ${escape_html(state.persianInfo.year)}</span></h2> <button class="nav-btn svelte-1iu5iby" aria-label="Next month"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button> <button class="today-btn svelte-1iu5iby">Today</button></div> <div class="calendar-grid svelte-1iu5iby"><!--[-->`);
		const each_array = ensure_array_like(dayNames);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let name = each_array[$$index];
			$$renderer.push(`<div class="day-header svelte-1iu5iby">${escape_html(name)}</div>`);
		}
		$$renderer.push(`<!--]--> <!--[-->`);
		const each_array_1 = ensure_array_like(state.days);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let d = each_array_1[$$index_1];
			$$renderer.push(`<button${attr_class("day-cell svelte-1iu5iby", void 0, {
				"today": d.isToday,
				"other-month": !d.isCurrentMonth
			})}><span class="day-number-g svelte-1iu5iby">${escape_html(d.day)}</span> <span class="day-number-p svelte-1iu5iby">${escape_html(d.persianDay)}</span></button>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer) {
	head("1uha8ag", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Safar — Calendar</title>`);
		});
	});
	$$renderer.push(`<main class="home svelte-1uha8ag">`);
	Calendar($$renderer, {});
	$$renderer.push(`<!----></main>`);
}
//#endregion
export { _page as default };
