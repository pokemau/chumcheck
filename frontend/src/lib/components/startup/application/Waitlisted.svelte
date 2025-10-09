<script lang="ts">
  import { Label } from '$lib/components/ui/label';
  export let stepName: string;
  export let currentStep: string;
  
  const waitlistData = {
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas efficitur eleifend. Quisque venenatis nisl pulvinar erat scelerisque, ut euismod enim congue. Curabitur tellus sem, pretium a fringilla vel, rutrum ac augue. Proin vitae ornare quam. Nam at urna vulputate, pharetra ante non, pharetra libero. Ut ultrices, diam at placerat consectetur, diam diam gravida mauris, nec tincidunt enim odio a libero. Nullam vel sollicitudin ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse gravida velit eu enim condimentum posuere. Quisque ex ante, tempor id purus at, pharetra blandit nibh. Pellentesque in felis ultricies arcu accumsan facilisis consequat eget magna. Sed nunc tellus, varius id libero ut, scelerisque posuere eros. Donec congue elit ac tellus eleifend aliquet. Cras vel efficitur massa. Suspendisse non iaculis lorem, ac placerat nunc. Quisque et congue purus. In vitae imperdiet sem. Mauris sed elementum erat. Suspendisse sem libero, dapibus eu eros vitae, efficitur bibendum sapien.Proin metus lorem, tempus vitae luctus vitae, sollicitudin ac nisl. Donec at turpis at eros convallis molestie. Mauris vel nisi quis enim blandit porta. Donec efficitur, dui non dictum ultrices, nisi erat fermentum nunc, nec accumsan risus lectus et sapien. Fusce id massa at lacus luctus posuere vel ac libero. Aliquam erat volutpat. In eros turpis, sodales id pharetra nec, dictum venenatis mauris. In viverra vehicula nibh eu rhoncus. Vestibulum et congue erat, dapibus sollicitudin purus. Sed porta ipsum a commodo rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Proin malesuada fringilla massa, eget imperdiet eros consectetur quis.Suspendisse pretium semper tincidunt. Etiam sagittis vestibulum tempus. Vivamus eu molestie libero, sit amet convallis nulla. Fusce posuere ligula quis semper dignissim. Nunc purus erat, commodo in pretium id, vulputate a arcu. Ut iaculis venenatis odio sit amet vulputate. Suspendisse vulputate purus non ante sollicitudin, vel elementum neque rhoncus. Integer sit amet sapien enim. Fusce facilisis at quam sit amet suscipit. Cras fermentum, quam tempus fermentum placerat, leo massa malesuada felis, sed euismod metus magna sed mi. Donec pharetra enim eget turpis convallis, eget semper lorem convallis. Sed felis lacus, elementum nec vestibulum porta, bibendum et diam. Sed quis leo tempor, lobortis ligula et, porttitor tellus. Morbi lobortis urna a dui vulputate euismod. Aliquam ultrices urna at tellus posuere, sed vehicula eros tristique. Nullam accumsan, enim et scelerisque consectetur, turpis elit laoreet mauris, eu congue dolor lacus vel turpis. Morbi ac justo quis turpis semper lacinia sit amet a justo. Ut aliquam dolor vitae molestie pulvinar. In hac habitasse platea dictumst. Aenean imperdiet ut elit ut maximus. Aliquam erat volutpat. Suspendisse leo dui, pretium et gravida a, vestibulum eu ipsum. Vestibulum sit amet suscipit est, quis sodales eros. Vivamus a dui at neque eleifend ornare nec vulputate elit. Curabitur euismod dui sed ultrices varius. Integer posuere tellus id sapien auctor tincidunt. Proin sapien odio, suscipit sed malesuada sed, blandit vitae orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed nibh enim, scelerisque eu lacus."};
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentStep !== stepName}>
  <div class="flex h-0 flex-col gap-5">
    <Label class="text-base font-semibold">
      Reason for waitlisting given by manager
    </Label>
    
    <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-800 dark:bg-gray-900">
      {waitlistData.message}
    </div>

    <div class="text-sm text-muted-foreground">
      Your startup application has been waitlisted. Please review the reason provided above and make the necessary improvements. Once you have addressed these concerns, you can proceed with the rest of the application process. We encourage you to thoroughly review each section and ensure all requirements are met before continuing.
    </div>
  </div>
</div>