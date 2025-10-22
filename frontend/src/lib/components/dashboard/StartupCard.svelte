<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Calendar, Users, Clock, Eye } from 'lucide-svelte';
  import Badge from '../ui/badge/badge.svelte';
  import { getBadgeColor } from '$lib/utils';

  export let startup: any;
  export let selectedTab: string;
  export let onOpenStartupDialog: (startup: any) => void;

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  function getMemberCount(startup: any) {
    if (startup.members && Array.isArray(startup.members)) {
      return startup.members.length + 1;
    }
    return 1;
  }
</script>

<Card.Root 
  class="bg-background rounded-lg shadow-sm border hover:bg-muted/50 hover:shadow-md transition-all cursor-pointer"
  onclick={() => onOpenStartupDialog(startup)}
>
  <Card.Content class="p-6">
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <!-- Company Name -->
        <h3 class="text-lg font-semibold text-foreground mb-2">
          {startup.capsuleProposal?.title || startup.name}
        </h3>
        
        <!-- Metadata -->
        <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div class="flex items-center gap-1">
            <Calendar class="w-4 h-4" />
            <span>{formatDate(startup.createdAt || startup.dateCreated || new Date().toISOString())}</span>
          </div>
          <div class="flex items-center gap-1">
            <Users class="w-4 h-4" />
            <span>{getMemberCount(startup)} members</span>
          </div>
        </div>
        
        <!-- Description -->
        <p class="text-sm text-muted-foreground leading-relaxed">
          {startup.capsuleProposal?.description || startup.description || startup.businessDescription || 'No description available'}
        </p>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex items-center gap-2 ml-4">
        {#if selectedTab === 'pending'}
          <Badge class="{getBadgeColor('Pending')}">
            <Clock size={12} class="mr-1" />
            Pending
          </Badge>
        {:else if selectedTab === 'waitlisted'}
          <Badge class="{getBadgeColor('Waitlisted')}">
            <Clock size={12} class="mr-1" />
            Waitlisted
          </Badge>
        {:else if selectedTab === 'qualified'}
          <Badge class="{getBadgeColor('Qualified')}">
            <Clock size={12} class="mr-1" />
            Qualified
          </Badge>
        {:else if selectedTab === 'completed'}
          <Badge class="{getBadgeColor('Completed')}">
            <Clock size={12} class="mr-1" />
            Completed
          </Badge>
        {/if}
        <Button
          variant="outline" 
          class="border-muted text-muted-foreground hover:bg-muted/50 px-4 py-2 h-auto text-sm"
          onclick={(e) => onOpenStartupDialog(startup)}
        >
          <Eye class="w-3 h-3 mr-1" />
          View Details
        </Button>
      </div>
    </div>
  </Card.Content>
</Card.Root>