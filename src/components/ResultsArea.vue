<script setup lang="ts">
    import LinkItem from './LinkItem.vue';
    import SkippedItem from './SkippedItem.vue';
    const props = defineProps({
        couponsList:Array<any>
    })
    const emits = defineEmits(["added"])

</script>

<template>
    <TransitionGroup name="links" tag="ul" @after-enter="emits('added')">
        <li v-for="item,index in couponsList" :key="index">
            <LinkItem v-if="!item.skipped" :item="(item as object)" :itemNum="index+1"/>
            <SkippedItem v-else :item="(item as object)" :itemNum="index+1"/>

        </li>
    </TransitionGroup>
</template>

<style>
    .links-move,
    .links-enter-active,
    .links-leave-active {
    transition: all 0.5s ease;
    }

    .links-enter-from,
    .links-leave-to {
    opacity: 0;
    transform: translateX(30px);
    }

    .links-leave-active {
    position: absolute;
    }

</style>