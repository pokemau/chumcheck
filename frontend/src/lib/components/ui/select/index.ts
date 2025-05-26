import { Select as SelectPrimitive } from 'bits-ui';

import GroupHeading from './select-group-heading.svelte';
import Item from './select-item.svelte';
import Content from './select-content.svelte';
import Trigger from './select-trigger.svelte';
import NoTrigger from './select-no-trigger.svelte';
import Separator from './select-separator.svelte';
import ScrollDownButton from './select-scroll-down-button.svelte';
import ScrollUpButton from './select-scroll-up-button.svelte';

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;

export {
  Root,
  Item,
  Group,
  GroupHeading,
  Content,
  Trigger,
  NoTrigger,
  Separator,
  ScrollDownButton,
  ScrollUpButton,
  //
  Root as Select,
  Item as SelectItem,
  Group as SelectGroup,
  GroupHeading as SelectGroupHeading,
  Content as SelectContent,
  Trigger as SelectTrigger,
  NoTrigger as SelectNoTrigger,
  Separator as SelectSeparator,
  ScrollDownButton as SelectScrollDownButton,
  ScrollUpButton as SelectScrollUpButton
};
