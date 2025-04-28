<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <v-img class="mb-4" height="150" src="@/assets/logo.png" />

      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">My Lego parts search</h1>
      </div>
      <SearchBrick />
      <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="color in colors" :key="color.name" :title="color.name" :text="color.rgb"
          :bg-color="convertHexToRgba(color.rgb)" :expand-icon="mdiToyBrick">
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useColors } from "@/client/DatabaseApi";
import { convertHexToRgba } from "@/service/ColorService";
import { mdiToyBrick } from '@mdi/js';

const { colors } = useColors()

const links = [
  {
    href: 'https://vuetifyjs.com/',
    icon: 'mdi-text-box-outline',
    subtitle: 'Learn about all things Vuetify in our documentation.',
    title: 'Documentation',
  },
  {
    href: 'https://vuetifyjs.com/introduction/why-vuetify/#feature-guides',
    icon: 'mdi-star-circle-outline',
    subtitle: 'Explore available framework Features.',
    title: 'Features',
  },
  {
    href: 'https://vuetifyjs.com/components/all',
    icon: 'mdi-widgets-outline',
    subtitle: 'Discover components in the API Explorer.',
    title: 'Components',
  },
  {
    href: 'https://discord.vuetifyjs.com',
    icon: 'mdi-account-group-outline',
    subtitle: 'Connect with Vuetify developers.',
    title: 'Community',
  },
]
</script>
