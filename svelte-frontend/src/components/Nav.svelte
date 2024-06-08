<!-- Navigation Component (e.g., Nav.svelte) -->
<script>
	import { page } from '$app/stores';

	let currentPath;
	page.subscribe(($page) => {
		currentPath = $page.url.pathname;
	});

	const isPathActive = (path) => {
		return currentPath === path;
	};
</script>

<div id="navbar" class="navbar bg-base-200">
	<div class="navbar-start">
		<div id="nav-dropdown" class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</div>
			<ul
				id="dropdown-list"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li id="generate-nav">
					<a href="/generate" class={isPathActive('/generate') ? 'btn btn-primary' : 'btn'}
						>Generate</a
					>
				</li>
				<li id="compare-nav">
					<a href="/compare" class={isPathActive('/compare') ? 'btn btn-primary' : 'btn'}>Compare</a
					>
				</li>
				<li id="hands-nav">
					<a href="/hands" class={isPathActive('/hands') ? 'btn btn-primary' : 'btn'}>Hands</a>
				</li>
			</ul>
		</div>
		<a id="title-nav" href="/" class="btn btn-ghost text-xl">Poker Hand Generator</a>
	</div>
	<div id="navbar-desktop" class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li id="generate-nav" class="mr-4">
				<a href="/generate" class={isPathActive('/generate') ? 'btn btn-primary' : 'btn'}
					>Generate</a
				>
			</li>
			<li id="compare-nav" class="mr-4">
				<a href="/compare" class={isPathActive('/compare') ? 'btn btn-primary' : 'btn'}>Compare</a>
			</li>
			<li id="hands-nav">
				<a href="/hands" class={isPathActive('/hands') ? 'btn btn-primary' : 'btn'}>Hands</a>
			</li>
		</ul>
	</div>
	<div class="navbar-end mr-4">@skogli</div>
</div>
