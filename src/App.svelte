<script>
  import { elasticOut, elasticInOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import {onMount} from 'svelte'

  let m = { x: 0, y: 0 }
  let allmystars = []

  let div
  let rect

  $: {
    if (div) {
      rect = div.getBoundingClientRect()
    }
  }

  function resize () {
    rect = div.getBoundingClientRect()
    console.log(rect)
  }

  let x = 0
  let y = 0
  let sx = `${x}%`
  let sy = `${y}%`

  function handleMousemove(event) {

    x = (event.clientX - rect.left - 125)  / window.innerWidth * 100 
    y = (event.clientY - rect.top) / window.innerHeight * 100
    sx = `${x > 100 ? 100 : x}%`
    sy = `${y > 100 ? 100 : y}%`
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
  .eyes {
    position: relative;
    height: 100%;
    width: 100%;
    top: -30%;
    left: -30%;
  }
  .eye {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    margin-right: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    width: 200px;
    background: #CCC;
    overflow: hidden;
  }
  .pupil {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: #000;
    border-radius: 50%;
    content: " ";
  }
  div.container {
    overflow: hidden;
    width: 100%; height: 100%; 
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .star {
    position: absolute;
  }
  .star::after {
    content: "★";
  }
</style>
<svelte:window on:resize={resize} />
<div class="container"
on:mousemove={handleMousemove}
on:touchstart={handleTouch}
on:touchend={handleTouch}
on:mouseup={handleClick}
>
<div class="eyes"
  bind:this={div}>
  <div class="eye">
    <div 
      class="pupil"
      style="
        top:{sy};
        left:{sx};
        transform: translate(-{sx}, -{sy})
      "
    >
    </div>
  </div>
  <div class="eye">
    <div 
      class="pupil"
      style="
        top: {sy};
        left: {sx};
        transform: translate(-{sx}, -{sy})"
    >
    </div>
  </div>
</div>
</div>
{#each allmystars as { key, x, y } (key)}
  <div 
    in:starIn="{{ duration: 400 }}"
    out:starOut="{{ duration: 5000 }}"
    class="star" 
    style="top:{y-14}px;left:{x-10}px;"
  />
{/each}