<script>
</script>
<style>
  button {
    font-size: 14px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    padding: 0;
    border-width: 1px;
    border-radius: 4px;
    /* button: side color */ background-color: purple;
    /* button: outer border */ border-color: black;
    padding-bottom: 2px;
  }
  button > span {
    display: block;
    border-radius: 4px;
    margin: 0;
    padding: 0.3rem;
    color: white;
    /* button: surface border */ border: 1px solid red;
    /* button: surface color */ background-color: purple;
  }
  button:hover {
    /* button: side color */ border-color: pink;
  }
  button:hover > span {
    /* button: surface color */ background-color: pink;
  }
  button:not(:disabled):not(.disabled):active {
    border-color: red;
    padding-bottom: 0px;
    margin-top: 2px !important;
    outline: none;
    box-shadow: none;
    background-color: red;
  }
  button:not(:disabled):not(.disabled):active > span {
    background-color: red;
  }
</style>

<button 
  role="button"
  on:click 
  on:mouseenter 
  on:mouseleave
>
  <span>
    <slot></slot>
  </span>
</button>