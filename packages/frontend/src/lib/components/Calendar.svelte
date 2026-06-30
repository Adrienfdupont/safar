	<script module>
		export interface CalendarDay {
			date: Date;
			day: number;
			persianDay: number;
			isToday: boolean;
			isCurrentMonth: boolean;
		}
	</script>

<script lang="ts">
	import { CalendarState, getDayNames } from '../calendar.svelte';
	import CalendarHeader from './CalendarHeader.svelte';

	const state = new CalendarState();
	const dayNames = getDayNames();
</script>

<div class="calendar-wrapper">
	<CalendarHeader
		year={state.year}
		month={state.month}
		goToMonth={(y, m) => state.goToMonth(y, m)}
		MONTHS={CalendarState.MONTHS}
	/>

	<div class="calendar-toolbar">
		<button class="nav-btn" onclick={() => state.goToPrevMonth()} aria-label="Previous month">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>
			<h2 class="current-month">
				<span class="gregorian">{state.monthName} {state.year}</span>
				<span class="persian">{state.persianInfo.monthNames.join(' / ')} {state.persianInfo.year}</span>
			</h2>
		<button class="nav-btn" onclick={() => state.goToNextMonth()} aria-label="Next month">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
		<button class="today-btn" onclick={() => state.goToToday()}>
			Today
		</button>
	</div>

	<div class="calendar-grid">
		{#each dayNames as name}
			<div class="day-header">{name}</div>
		{/each}

		{#each state.days as d}
			<button
				class="day-cell"
				class:today={d.isToday}
				class:other-month={!d.isCurrentMonth}
			>
				<span class="day-number-g">{d.day}</span>
				<span class="day-number-p">{d.persianDay}</span>
			</button>
		{/each}
	</div>
	</div>

<style>
	.calendar-wrapper {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding: 0.5rem;
		user-select: none;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	.calendar-grid {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: auto repeat(6, 1fr);
		gap: 2px;
		align-content: start;
	}

	.calendar-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.25rem;
		gap: 0.5rem;
	}

	.current-month {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		font-size: clamp(1.15rem, 3vw, 1.35rem);
		font-weight: 600;
		margin: 0;
		text-align: center;
		flex: 1;
	}

	.current-month .gregorian {
		font-weight: 600;
	}

	.current-month .persian {
		font-size: 0.85em;
		font-weight: 400;
		color: var(--color-muted, #888);
		font-family: var(--font-persian, inherit);
	}

	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 50%;
		background: transparent;
		color: inherit;
		cursor: pointer;
		transition: background 0.15s;
	}

	.nav-btn:hover {
		background: var(--color-hover, rgba(128, 128, 128, 0.12));
	}

	.day-header {
		text-align: center;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-muted, #888);
		padding: 0.5rem 0;
	}

	.day-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1px;
		border: none;
		background: transparent;
		border-radius: 8px;
		cursor: pointer;
		font-size: clamp(0.9rem, 2vw, 1rem);
		color: inherit;
		transition: background 0.15s;
		position: relative;
	}

	.day-number-g {
		font-size: inherit;
		line-height: 1;
	}

	.day-number-p {
		font-size: 0.65em;
		color: var(--color-muted, #888);
		line-height: 1;
		font-family: var(--font-persian, inherit);
	}

	.day-cell.other-month .day-number-p {
		color: var(--color-muted-2, #ccc);
	}

	.day-cell:hover {
		background: var(--color-hover, rgba(128, 128, 128, 0.12));
	}

	.day-cell.other-month {
		color: var(--color-muted, #aaa);
	}

	.day-cell.today {
		font-weight: 700;
	}

	.day-cell.today .day-number-g {
		background: var(--color-accent, #3b82f6);
		color: #fff;
		border-radius: 50%;
		width: clamp(32px, 5vw, 36px);
		height: clamp(32px, 5vw, 36px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.today-btn {
		padding: 0.4rem 0.9rem;
		border: 1px solid var(--color-border, #ddd);
		border-radius: 8px;
		background: transparent;
		color: inherit;
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s;
		white-space: nowrap;
	}

	.today-btn:hover {
		background: var(--color-hover, rgba(128, 128, 128, 0.12));
	}

	/* Responsive: tablets and up can show larger cells */
	@media (min-width: 600px) {
		.calendar-wrapper {
			padding: 1rem;
		}

		.day-header {
			font-size: 0.8rem;
		}

		.calendar-grid {
			gap: 4px;
		}
	}

	@media (min-width: 900px) {
		.day-header {
			font-size: 0.85rem;
		}
	}
</style>
