<script>
	import Calendar from '$lib/components/Calendar.svelte';
</script>

<svelte:head>
	<title>Safar — Calendar</title>
</svelte:head>

<main class="home">
	<Calendar />
</main>

<style>
	.home {
		min-height: 100dvh;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0.5rem;
		box-sizing: border-box;
		overflow: hidden;
	}
</style>
