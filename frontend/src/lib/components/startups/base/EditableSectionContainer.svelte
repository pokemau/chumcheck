<script lang="ts">
  export let label = '';
</script>

<div class="flex w-4/6 flex-col gap-5">
  <h1 class="text-2xl font-semibold">{label}</h1>
  <div class="flex h-[550px] flex-col gap-5 overflow-y-scroll">
    <slot />
  </div>
</div>

<!-- <EditableSection
          label="Tasks"
          editMode={editDescription}
          role={role}
          data={rnsCopy.description}
          dataId={rnsCopy.id}
          update={update}
          isTask={true}
          taskDescription={tasks.filter((task: any) => task.id === rnsCopy.rns)[0].description}
          />
          <EditableSection
          label="Description"
          editMode={editDescription}
          role={role}
          data={rnsCopy.description}
          dataId={rnsCopy.id}
          dataColumn="description"
          update={update}
          />
          <EditableSection
          label="Measures"
          editMode={editMeasures}
          role={role}
          data={rnsCopy.measures}
          dataId={rnsCopy.id}
          dataColumn="measures"
          update={update}
          />
          <EditableSection
          label="Target"
          editMode={editTarget}
          role={role}
          data={rnsCopy.targets}
          dataId={rnsCopy.id}
          dataColumn="targets"
          update={update}
          />
          <EditableSection
          label="Remarks"
          editMode={editRemarks}
          role={role}
          data={rnsCopy.remarks}
          dataId={rnsCopy.id}
          dataColumn="remarks"
          update={update}
          /> -->
