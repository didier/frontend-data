<script>
  import Car from '../atoms/Car.svelte'

  export let isDriving = false
  export let scrollY = 0

  $: isDriving = scrollY !== 0
</script>

<style>
  .road-scene {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 20vvmax;
    padding: 20px;
    overflow-y: hidden;
  }

  .road {
    position: absolute;
    left: 0;
    bottom: 0;
    background-image: url('/assets/road.svg');
    background-repeat: repeat-x;
    background-position: center bottom;
    height: 100%;
    width: 300vw;
    z-index: 0;
    overflow: hidden;
  }

  .road.is-scrolling {
    animation: slide 5s linear infinite;
    animation-play-state: paused;
    animation-delay: var(--delay);
  }

  @keyframes slide {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-160vw, 0, 0);
    }
  }
</style>

<svelte:window bind:scrollY />
<div class="road-scene" style="--delay: -{scrollY}ms">
  <div class="road" class:is-scrolling={isDriving} />
  <Car {isDriving} style="--delay: -{scrollY}ms" />
</div>
