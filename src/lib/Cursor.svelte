<script lang="ts">
	import { mouse, cursorHover } from '$lib/stores';
</script>

<div class="pointer-events-none fixed inset-0 z-[9999]">
	<div
		class="absolute rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
		style="
			width: {$cursorHover ? 32 : 6}px;
			height: {$cursorHover ? 32 : 6}px;
			left: {$mouse.x * 100}vw;
			top: {$mouse.y * 100}vh;
			background: white;
			transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	"
	></div>
	<div
		class="absolute rounded-full -translate-x-1/2 -translate-y-1/2 border pointer-events-none"
		style="
			width: {$cursorHover ? 48 : 28}px;
			height: {$cursorHover ? 48 : 28}px;
			left: {$mouse.x * 100}vw;
			top: {$mouse.y * 100}vh;
			border-color: rgba(255, 255, 255, {$cursorHover ? 0.6 : 0.3});
			transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
						height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
						border-color 0.4s ease;
	"
	></div>
</div>
