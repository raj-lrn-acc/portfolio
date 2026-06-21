<script lang="ts">
	import { mouse, cursorHover } from '$lib/stores';
</script>

<div class="pointer-events-none fixed inset-0 z-[9999]">
	<div class="absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-full mix-blend-difference" style="width: {$cursorHover ? 20 : 4}px; height: {$cursorHover ? 20 : 4}px; left: {$mouse.x * 100}vw; top: {$mouse.y * 100}vh; transition: width 0.25s, height 0.25s"></div>
	<div class="absolute -translate-x-1/2 -translate-y-1/2 border rounded-full" style="width: {$cursorHover ? 36 : 22}px; height: {$cursorHover ? 36 : 22}px; left: {$mouse.x * 100}vw; top: {$mouse.y * 100}vh; border-color: rgba(255,255,255,{$cursorHover ? 0.5 : 0.15}); transition: width 0.35s, height 0.35s, border-color 0.25s"></div>
</div>
