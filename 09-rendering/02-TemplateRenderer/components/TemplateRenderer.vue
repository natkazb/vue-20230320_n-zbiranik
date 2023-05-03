<script>
import { compile, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  render() {
    return h({render: compile(this.template), components: this.components, props: {bindings: this.bindings}}, {bindings: this.bindings});
  },

};
</script>
