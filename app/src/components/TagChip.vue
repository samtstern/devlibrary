<!--
 Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <span>
    <div
      :class="[color]"
      class="inline-block ml-3 mr-1 h-3 w-3 rounded-full"
    ></div>
    <span class="text-gray-500">{{ tag.key }}</span>
  </span>
</template>

<script lang="ts">
import { ProductTag } from "@/model/product";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TagChip extends Vue {
  @Prop() tag!: ProductTag;

  get color() {
    return this.tag.color || "bg-gray-500";
  }
}
</script>
