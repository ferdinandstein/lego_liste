<template>
  <v-container class="fill-height" max-width="700">
    <div>
      <v-img class="mb-4 cursor-none" height="150" src="@/assets/logo.png" />
      <div class="mb-8 text-center cursor-none">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">My Lego parts search</h1>
      </div>
      <v-divider class="mb-10" />
      <SearchBrick @part-loaded="newPartLoaded" />
      <v-divider class="mb-10" />
      <SearchResultView :part="currentPart" :searchResult="searchResult" />

      <Overview :searchResult="searchResult" />
      <AddNewSet />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import AddNewSet from "@/components/AddNewSet.vue";
import Overview from "@/components/Overview.vue";
import SearchBrick from "@/components/SearchBrick.vue";
import SearchResultView from "@/components/SearchResultView.vue";
import type { Part } from "@/model/Part";
import { useSearchResults } from "@/service/SearchService";
import Karussell from "./Karussell.vue";

const { currentPart, searchResult, loadPartResults } = useSearchResults();

const newPartLoaded = async (part: Part | undefined) => {
  if (part) {
    await loadPartResults(part);
  }
};
</script>
