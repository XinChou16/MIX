<template>
<section>
  <button @click="increment">
    Count is {{state.count}}, double is {{state.double}}
  </button>
</section>
</template>

<script>
import { ref, reactive, computed, onMounted } from '@vue/composition-api'

function useCount(props) {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    });

    function increment() {
      state.count++;
    }

    onMounted(() => {
      console.log('Component is mounted', props.name);
    });

    return { state, increment }
}

export default {
  // data: () => ({
  //   count: 1,
  //   object: {
  //     foo: 2
  //   }
  // }),
  props: {
    name: String
  },
  setup(props, ctx) {
    console.log('setup', props, ctx)
    const { state, increment } = useCount(props);

    return {
      state,
      increment
    }
  }
}


</script>

<style>

</style>
