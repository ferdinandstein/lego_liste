<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <v-img class="mb-4" height="150" src="@/assets/logo.png" />

      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">My Lego parts search</h1>
      </div>
      <SearchBrick @part-loaded="newPartLoaded" />
      <SearchResultView :part="currentPart" :setInfos="setInfos" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useSetInfos } from "@/client/DatabaseApi";
import type { Part } from "@/model/Part";
import type { SetInfo } from "@/model/SetInfo";
import { ref } from "vue";

const { fetchSetInfo } = useSetInfos()

const currentPart = ref<Part | undefined>(undefined)
const setInfos = ref<SetInfo[]>([])

const newPartLoaded = (part: Part) => {
  currentPart.value = part

  if (part) {
    setInfos.value = []
    for (const setId of part.setIds) {
      fetchSetInfo(setId).then((setInfo) => {
        setInfos.value.push(setInfo)
      })
    }
  } else {
    setInfos.value = []
  }
}

</script>
