<template>
  <svg :class="iconClass">
    <use :xlink:href="'#'+symbol"></use>
  </svg>
</template>

<script>
  // requires and returns all modules that match
  const requireAll = requireContext => requireContext.keys().map(requireContext);
  // import all svg
  const req = require.context('../../../assets/icons', true, /\.svg$/);
  requireAll(req);
  export default {
    props: [
      'symbol',
      'className',
      ''
    ],
    computed: {
      iconClass() {
        const { symbol, className } = this;
        return className ? `Icon Icon-${symbol} ${className}` : `Icon Icon-${symbol}`
      }
    }
  }
</script>
