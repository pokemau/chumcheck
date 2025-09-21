<script lang="ts">
  import { Label } from '$lib/components/ui/label';
  import * as RadioGroup from '$lib/components/ui/radio-group';
  export let dataPrivacy: boolean, toggleDataPrivacy: Function;
  export let currentActive: number;
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentActive !== 0}>
  <div class="flex h-0 flex-col gap-5">
    <label class="label" for="data_privacy">
      <span class="label-text text-base"
        >By accomplishing this form, the following personal information will be
        collected including, startup team members' names, personal email
        address, mobile phone number and other relevant information. The
        personal information you will provide in this form will be used within
        ChumCheck Program, DASIG consortium committee and will not be shared
        with any outside parties unless you have prior written consent.
        Development and Acceleration Support for Innovation Growth (DASIG)
        respects your rights as a data subject under the Data Privacy Act.
        <br /><br />
        If you have further questions and concerns regarding the processing of your
        personal information, you are welcome to contact our project lead, Engr.
        Jurydel Rama, at jurydel.rama@cit.edu.
        <br /><br />
        In compliance with the Data Privacy Act (DPA) of 2012, also known as the
        Republic Act of 10173 (RA 10173), I agree and authorize the Development and
        Acceleration Support for Innovation Growth (DASIG) consortium members to
        use the personal information for the purpose of ChumCheck programs and initiatives.
        I also acknowledge and warrant that I have acquired the consent from all
        parties relevant to this consent and hold free and harmless and indemnify
        Development and Acceleration Support for Innovation Growth (DASIG) from any
        complaint, suit, or damages which any party may file or claim in relation
        to my consent.</span
      >
    </label>

    <RadioGroup.Root value={`${dataPrivacy}`} name="data_privacy">
      <div class="flex items-center space-x-2">
        <RadioGroup.Item
          value="true"
          id="dataAgree"
          onclick={() => toggleDataPrivacy(true)}
        />
        <Label for="dataAgree">Agree</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroup.Item
          value="false"
          id="dataDisagree"
          onclick={() => toggleDataPrivacy(false)}
        />
        <Label for="dataDisagree">Disagree</Label>
      </div>
      <!-- <RadioGroup.Input name="data_privacy" /> -->
    </RadioGroup.Root>
  </div>
</div>
