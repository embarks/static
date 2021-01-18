<script>
  import Eyes from "./Eyes.svelte"
  import Button from "./Button.svelte"
  import Loading from "./Loading.svelte"
  import { elasticOut, elasticInOut } from "svelte/easing"

  let scrolly = 0
  let allmystars = []
  let agree = false
  let express = false

  function onScroll () { scrolly = window.pageYOffset }

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
  
  function handleButton (eventType) {
    if (eventType === "mouseenter")
      return () => {
        express = true
      }
    if (eventType === "mouseleave") 
      return () => {
        express = false
      }
    return () => {
      agree = !agree
      express = false
    }
  }
  
  function handleClick(event) {
    const y = event.clientY + scrolly
    const key = `${event.clientX} ${y}`
    allmystars = [...allmystars, { x: event.clientX, y, key }]
    setTimeout(function () {
      allmystars = allmystars.filter(({ key: o }) => key !== o)
    }, 200)
  }

  function handleTouch(e) {
    express = false
    handleClick({
      clientY: e.changedTouches[0].clientY,
      clientX: e.changedTouches[0].clientX,
      target: e.target
    })
  }

</script>

<style>
  :global(body) {
    background-color: white;
    padding: 0;
    font-size: 10px;
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

<svelte:window on:scroll={onScroll} />

<h1>
  my [svelte] gallery
</h1>
<!-- <div class="outer"
  on:touchstart={handleTouch}
  on:touchend={handleTouch}
  on:mouseup={handleClick}
> -->
  <Eyes express={express} close={agree} />
<!-- </div> -->
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