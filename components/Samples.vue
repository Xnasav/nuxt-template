<template>
  <Button label="Check" icon="pi-check" />
  <!-- <div>
    <h1>
      {{ blueKeys }}
    </h1>
    <div
      v-for="blueGrade in blueGradesKeys"
      :id="blueGrade"
      class="tw-h-10 tw-w-10"
      :style="`background-color: ${colorGradeBlue[blueKeys[0]][blueGrade]}`"
    ></div>
  </div> -->
</template>

<script setup lang="ts">
import {
  type ColorGrade,
  generateTintsAndShades,
} from "~/utilities/theming/colorGenerator";

const colorGrades: ColorGrade = {};

const colorGradeBlue = generateTintsAndShades("blue", "#3498db");
const blueKeys = Object.keys(colorGradeBlue);
const blueGradesKeys = Object.keys(colorGradeBlue[blueKeys[0]]);
</script>
