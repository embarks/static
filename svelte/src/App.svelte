<script>
  import Eyes from "./Eyes.svelte"
  import Button from "./Button.svelte"
  import Loading from "./Loading.svelte"
  import { elasticOut, elasticInOut } from "svelte/easing"

  let scrolly = 0
  let allmystars = []
  let agree = false
  let express = false
  let loading = false

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
      loading = true
      agree = true
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
    background-color: #333333;
    padding: 0;
    font-size: 10px;
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
  .button {
    position: absolute;
    margin-top: 5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  .loading-container {
    display: block;
    width: 100px;
  }
</style>

<svelte:window on:scroll={onScroll} />
<div class="button">
<Button
  class="button"
  on:click={handleButton("click")}
  on:mouseenter={handleButton("mouseenter")}
  on:mouseleave={handleButton("mouseleave")}
  on:touchend={handleButton("touchend")}
  on:focus={handleButton("mouseenter")}
  on:blur={handleButton("mouseleave")}
>
  {#if loading}
    <Loading />
  {:else}
    <input id="surveil" bind:checked={agree} type="checkbox" />
    I agree
  {/if}

  
</Button>
</div>
<div class="outer"
  on:touchstart={handleTouch}
  on:touchend={handleTouch}
  on:mouseup={handleClick}
>
  <Eyes express={express} close={agree} />
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