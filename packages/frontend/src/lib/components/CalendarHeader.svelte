<script lang="ts">
	interface Props {
		year: number;
		month: number;
		goToMonth: (y: number, m: number) => void;
		MONTHS: readonly string[];
	}

	let { year, month, goToMonth, MONTHS }: Props = $props();

	function handleMonthClick(index: number) {
		let targetYear = year;
		if (index < month && index <= month - 6) {
			targetYear = year + 1;
		} else if (index > month && index >= month + 6) {
			targetYear = year - 1;
		}
		goToMonth(targetYear, index);
	}
</script>

<nav class="month-strip" aria-label="Month selector">
	{#each MONTHS as name, i}
		{@const isCurrent = i === month}
		<button
			class="month-chip"
			class:active={isCurrent}
			onclick={() => handleMonthClick(i)}
			aria-current={isCurrent ? 'page' : undefined}
		>
			<span class="month-short">{name.slice(0, 3)}</span>
			<span class="month-full">{name}</span>
		</button>
	{/each}
</nav>

<style>
	.month-strip {
		display: flex;
		overflow-x: auto;
		gap: 4px;
		padding: 0.5rem 0;
		scrollbar-width: none;
		-ms-overflow-style: none;
		scroll-behavior: smooth;
	}

	.month-strip::-webkit-scrollbar {
		display: none;
	}

	.month-chip {
		flex-shrink: 0;
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--color-border, #ddd);
		border-radius: 20px;
		background: transparent;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-muted, #888);
		cursor: pointer;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.month-chip:hover {
		border-color: var(--color-accent, #3b82f6);
		color: inherit;
	}

	.month-chip.active {
		background: var(--color-accent, #3b82f6);
		border-color: var(--color-accent, #3b82f6);
		color: #fff;
		font-weight: 600;
	}

	.month-full {
		display: none;
	}

	.month-short {
		display: inline;
	}

	/* Show full month names on tablet+ */
	@media (min-width: 600px) {
		.month-strip {
			gap: 6px;
			justify-content: center;
			padding: 0.75rem 0;
		}

		.month-chip {
			font-size: 0.85rem;
			padding: 0.45rem 0.9rem;
		}

		.month-short {
			display: none;
		}

		.month-full {
			display: inline;
		}
	}
</style>
