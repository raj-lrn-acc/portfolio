<script lang="ts">
	import { mouse, cursorHover } from '$lib/stores';
</script>

<div class="pointer-events-none fixed inset-0 z-[9999]" style="cursor: none">
	<div
		class="absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-full mix-blend-difference"
		style="
			width: {$cursorHover ? 24 : 5}px;
			height: {$cursorHover ? 24 : 5}px;
			left: {$mouse.x * 100}vw;
			top: {$mouse.y * 100}vh;
			transition: width 0.3s, height 0.3s;
	"
	></div>
	<div
		class="absolute -translate-x-1/2 -translate-y-1/2 border rounded-full"
		style="
			width: {$cursorHover ? 40 : 24}px;
			height: {$cursorHover ? 40 : 24}px;
			left: {$mouse.x * 100}vw;
			top: {$mouse.y * 100}vh;
			border-color: rgba(255,255,255,{$cursorHover ? 0.5 : 0.2});
			transition: width 0.4s, height 0.4s, border-color 0.3s;
	"
	></div>
</div>
