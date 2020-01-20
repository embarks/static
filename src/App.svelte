<script>
  import { elasticOut } from 'svelte/easing'
  let m = { x: 0, y: 0 }
  let allmystars = []
  function handleMousemove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
  
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
  
  
  function handleClick(event) {
    let key = `${event.clientX} ${event.clientY}`
    allmystars = [...allmystars, { x: event.clientX, y: event.clientY, key }]
  }
</script>

<style>
  div:not(.star) { width: 100%; height: 100%; }
  .star {
    position: absolute;
  }
  .star::after {
    content: "★";
  }
</style>

<div
  on:mousemove={handleMousemove}
  on:mousedown={handleClick}
  on:touchstart={handleClick}
>
  The mouse position is {m.x} x {m.y}
</div>
{#each allmystars as { key, x, y } (key)}
  <div 
    in:starIn="{{ duration: 1000 }}" 
    class="star" 
    style="top:{y-14}px;left:{x-10}px;"
  />
{/each}