<script>
  import Eyes from './Eyes.svelte'
  import {elasticOut, elasticInOut} from 'svelte/easing'
  import {onMount} from 'svelte'

  let m = { x: 0, y: 0 }
  let allmystars = []
  const NO_ACTION_TYPE = "INPUT"
  
  function starIn (node, { duration }) {
    return {
      duration,
      css: t => {
        const eased = elasticOut(t)
        const css = `
          transform: scale(${eased})
        `
        return css
      }
    }
  }

  function starOut (node, { duration }) {
    return {
      duration, 
      css: t => {
        const eased = elasticInOut(t)

        const css = `
          transform: scale(${eased});
          opacity: ${eased};
        `
        return css
      }
    }
  }
  
  
  function handleClick(event) {
    if (event.target.nodeName !== NO_ACTION_TYPE) {
      const y = event.clientY - window.scrollY;
      const key = `${event.clientX} ${y}`
      allmystars = [...allmystars, { x: event.clientX, y, key }]
      setTimeout(function () {
        allmystars = allmystars.filter(({ key: o }) => key !== o)
      }, 200)
    }
  }

  function handleTouch(e) {
    handleClick({
      clientY: e.changedTouches[0].clientY,
      clientX: e.changedTouches[0].clientX,
      target: e.target
    })
  }
</script>

<style>
  :global(body) {
    background-color: #333333;
    padding: 0;
  }
  .outer {  
    height: 100%;
    width: 100%;
  }
  
  .star {
    position: absolute;
    font-size: 2rem;
  }
  .star::after {
    content: "★";
    color: #ffcc66;
    z-index: -1;
  }
</style>
<div class="outer"
  on:touchstart={handleTouch}
  on:touchend={handleTouch}
  on:mouseup={handleClick}
>
  <Eyes />
</div>
{#each allmystars as { key, x, y } (key)}
  <div
    in:starIn="{{ duration: 400 }}"
    out:starOut="{{ duration: 5000 }}"
    class="star" 
    style="
      top:{y-14*2}px;
      left:{x-10*2}px;
    "
  ></div>
{/each}