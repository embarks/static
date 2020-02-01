<script>
  import Eyes from './Eyes.svelte'
  import {elasticOut, elasticInOut} from 'svelte/easing'
  import {onMount} from 'svelte'

  let m = { x: 0, y: 0 }
  let allmystars = []
  
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
    const key = `${event.clientX} ${event.clientY}`
    allmystars = [...allmystars, { x: event.clientX, y: event.clientY, key }]
    setTimeout(function () {
      allmystars = allmystars.filter(({ key: o }) => key !== o)
    }, 200) 
  }

  function handleTouch(e) {
    handleClick({
      clientY: e.changedTouches[0].clientY,
      clientX: e.changedTouches[0].clientX
    })
  }
</script>

<style>
  :global(body) {
    background-color: #333333;
  }
  .outer {  
    height: 100%;
    width: 100%;
  }
  
  .star {
    position: absolute;
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
  <Eyes  />
</div>
{#each allmystars as { key, x, y } (key)}
  <div 
    in:starIn="{{ duration: 400 }}"
    out:starOut="{{ duration: 5000 }}"
    class="star" 
    style="top:{y-14}px;left:{x-10}px;"
  ></div>
{/each}