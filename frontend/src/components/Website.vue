<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <v-img class="mb-4" height="150" src="@/assets/logo.png" />

      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">My Lego parts search</h1>
      </div>
      <SearchBrick @part-loaded="newPartLoaded" />
      <SearchResult :part="currentPart" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import type { Part } from "@/model/Part";
import { ref } from "vue";

const currentPart = ref<Part | undefined>(undefined)

const newPartLoaded = (part: Part) => {
  currentPart.value = part
}

</script>
