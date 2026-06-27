/**
 * Lightweight calendar state management using Svelte runes.
 * No external dependencies — pure date math.
 */

export interface CalendarDay {
	date: Date;
	day: number;
	persianDay: number;
	isToday: boolean;
	isCurrentMonth: boolean;
}

const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const PERSIAN_MONTHS = [
	'Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
	'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand',
] as const;

/** Converts a Gregorian Date to Persian (Solar Hijri) year, month (0-based), and day. */
export function gregorianToPersian(date: Date): { year: number; month: number; day: number } {
	// Use the Persian calendar with en-US locale to get Western digits for parsing
	const fmt = new Intl.DateTimeFormat('en-US-u-ca-persian', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});
	const parts = fmt.formatToParts(date);

	let year = 0, month = 0, day = 0;
	for (const p of parts) {
		if (p.type === 'year') year = parseInt(p.value, 10);
		if (p.type === 'month') month = parseInt(p.value, 10) - 1;
		if (p.type === 'day') day = parseInt(p.value, 10);
	}
	return { year, month, day };
}

export function getPersianMonthName(month: number): string {
	return PERSIAN_MONTHS[month];
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export function getMonthName(month: number): string {
	return MONTHS[month];
}

export function getDayNames(): readonly string[] {
	return DAY_NAMES;
}

export class CalendarState {
	currentDate = $state(new Date());

	constructor() {
		// Ensure runes mode picks up the class
	}

	get year(): number {
		return this.currentDate.getFullYear();
	}

	get month(): number {
		return this.currentDate.getMonth();
	}

	get monthName(): string {
		return MONTHS[this.month];
	}

	get persianInfo(): { year: number; monthNames: string[] } {
		const firstDay = gregorianToPersian(new Date(this.year, this.month, 1));
		const lastDay = gregorianToPersian(new Date(this.year, this.month + 1, 0));

		// Collect unique Persian months that this Gregorian month spans
		const months = new Set<number>();
		const years = new Set<number>();
		months.add(firstDay.month);
		years.add(firstDay.year);
		if (lastDay.month !== firstDay.month) {
			months.add(lastDay.month);
			years.add(lastDay.year);
		}

		const sortedMonths = [...months].sort((a, b) => a - b);
		const monthNames = sortedMonths.map((m) => PERSIAN_MONTHS[m]);

		// Show year range if it spans across Persian new year
		const yearStr = years.size === 1 ? `${firstDay.year}` : `${firstDay.year}/${lastDay.year}`;

		return { year: firstDay.year, monthNames: monthNames.map((n) => `${n}`) };
	}

	get days(): CalendarDay[] {
		const y = this.year;
		const m = this.month;

		// First day of the month
		const firstDay = new Date(y, m, 1);
		// Day of week (0 = Sun, we want 0 = Mon)
		let startDow = firstDay.getDay() - 1;
		if (startDow < 0) startDow = 6;

		// Start from the Monday before the first of the month
		const gridStart = new Date(y, m, 1 - startDow);

		const today = new Date();
		const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

		const result: CalendarDay[] = [];

		// Always show 6 weeks (42 days)
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
				isCurrentMonth: d.getMonth() === m && d.getFullYear() === y,
			});
		}

		return result;
	}

	goToPrevMonth(): void {
		this.currentDate = new Date(this.year, this.month - 1, 1);
	}

	goToNextMonth(): void {
		this.currentDate = new Date(this.year, this.month + 1, 1);
	}

	goToToday(): void {
		this.currentDate = new Date();
	}

	goToMonth(y: number, m: number): void {
		this.currentDate = new Date(y, m, 1);
	}

	static readonly MONTHS = MONTHS;
	static readonly PERSIAN_MONTHS = PERSIAN_MONTHS;
}
