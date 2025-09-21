<script lang="ts">
  export let toggleEligibility: Function;
  export let eligibility: boolean;
  export let currentActive: number;
  import { Label } from '$lib/components/ui/label';
  import * as RadioGroup from '$lib/components/ui/radio-group';
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentActive !== 1}>
  <div class="flex h-0 flex-col gap-5">
    <p class="text-base">
      I confirm that I have read, understood, and agree to comply with the
      eligibility criteria and rules of the competition. Additionally, I will
      review the eligibility requirements and agreement.
    </p>

    <RadioGroup.Root value={`${eligibility}`} name="eligibility">
      <div class="flex items-center space-x-2">
        <RadioGroup.Item
          value="true"
          id="eligibilityAgree"
          onclick={() => toggleEligibility(true)}
        />
        <Label for="eligibilityAgree">Agree</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroup.Item
          value="false"
          id="eligibilityDisagree"
          onclick={() => toggleEligibility(false)}
        />
        <Label for="eligibilityDisagree">Disagree</Label>
      </div>
      <!-- <RadioGroup.Input name="eligibility" /> -->
    </RadioGroup.Root>
  </div>
</div>
