<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    message: string
    avatar: string
    unread?: number
    online?: boolean
  }>(),
  { unread: 0, online: true }
)

const emit = defineEmits<{ open: [] }>()
</script>

<template>
  <button type="button" class="chat" @click="emit('open')">
    <span class="chat__avatar">
      <img :src="avatar" :alt="name" class="chat__img" />
      <span v-if="online" class="chat__dot" aria-hidden="true" />
    </span>

    <span class="chat__body">
      <span class="chat__top">
        <span class="chat__name">{{ name }}</span>
        <span v-if="unread" class="chat__badge">{{ unread }}</span>
      </span>
      <span class="chat__message">{{ message }}</span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
// Floating assistant notification. The parent view fixes its position
// (bottom-right; above the bottom nav on mobile).
.chat {
  display: flex;
  align-items: center;
  gap: $space-3;
  width: 300px;
  max-width: calc(100vw - #{$space-4} * 2);
  padding: $space-6 $space-4;
  text-align: left;
  background: $color-primary;
  border: none;
  border-radius: $radius-lg;
  box-shadow: $shadow-popup;
  color: $color-surface;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__avatar {
    position: relative;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: $radius-pill;
  }

  &__dot {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 9px;
    height: 9px;
    background: $color-surface;
    border: 2px solid $color-primary;
    border-radius: $radius-pill;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }

  &__top {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__name {
    flex: 1;
    min-width: 0;
    font-size: rem(13);
    font-weight: $fw-semibold;
    line-height: 1.2;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    min-width: 18px;
    height: 18px;
    padding-inline: 5px;
    font-size: rem(10);
    font-weight: $fw-bold;
    background: $color-danger-dark;
    border-radius: $radius-pill;
  }

  &__message {
    overflow: hidden;
    font-size: rem(11);
    font-weight: $fw-regular;
    line-height: 1.3;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.85);
  }
}
</style>
