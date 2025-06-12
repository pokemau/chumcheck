<script lang="ts">
    import { Badge } from '$lib/components/ui/badge';
    import { getReadinessStyles } from '$lib/utils';
    import { hoveredRNSCard } from '$lib/stores/hoveredRNSCard';
    import { onMount, onDestroy } from 'svelte';
    let unsub: (() => void) | null = null;
    let rns: any = null;
    let coords: { x: number; y: number } | null = null;
    let visible = false;
    let tooltipEl: HTMLDivElement | null = null;
    let tooltipStyle = '';
    let isBrowser = typeof window !== 'undefined';

    function updateTooltipPosition() {
        if (!isBrowser || !coords || !tooltipEl) return;
        const rect = tooltipEl.getBoundingClientRect();
        const badgeY = coords.y;
        const badgeX = coords.x;
        const padding = 8;
        let top = badgeY - rect.height + 4;
        let left = badgeX - rect.width / 3;

        // Clamp to viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        if (left + rect.width > viewportWidth - padding) {
            left = viewportWidth - rect.width - padding;
        }
        if (left < padding) left = padding;
        if (top < padding) top = padding;
        if (top + rect.height > viewportHeight - padding) {
            top = viewportHeight - rect.height - padding;
        }
        tooltipStyle = `top: ${top}px; left: ${left}px;`;
    }

    if (isBrowser) {
        unsub = hoveredRNSCard.subscribe((val) => {
            rns = val.rns;
            coords = val.coords;
            visible = val.visible;
            setTimeout(updateTooltipPosition, 0);
        });
    }

    onDestroy(() => {
        if (unsub) unsub();
    });
</script>

{#if visible && rns && coords}
    <div bind:this={tooltipEl} class="fixed z-[100] pointer-events-none" style={tooltipStyle}>
        <div class="rounded-lg shadow-lg bg-gray-900 border border-gray-700 w-80 p-0.5">
            <div class="flex flex-col gap-2 p-4">
                <div class="flex items-center gap-2 mb-1">
                    <Badge class="text-xs font-semibold border-2 border-sky-600 text-sky-600 bg-blue-950 rounded px-2 py-0.5">
                        RNS #{rns.priorityNumber ?? ''}
                    </Badge>
                    <Badge class={`text-xs font-bold ${getReadinessStyles(rns.readinessType)}`}>
                        {rns.readinessType}
                    </Badge>
                </div>
                <div class="text-[13px] font-semibold text-white mb-1">
                    {  rns.description?.substring(0, 60) + (rns.description?.length > 60 ? '...' : '')}
                </div>
                <div class="text-xs text-gray-400 mb-1">
                    Assigned: {#if rns.assignee}
                      {(() => {
                        const first = rns.assignee.firstName ?? '';
                        const last = rns.assignee.lastName ?? '';
                        const full = (first + (last ? ' ' + last : '')).trim();
                        return full.length > 12 ? full.slice(0, 11) + '…' : full;
                      })()}
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}
