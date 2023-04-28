<script>
import { compile, h } from 'vue';

const Temp = {
  name: 'Temp',

  components: () => this.components,

  props: {
    template: {
      type: String,
      required: true,
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  render() {
    return compile(this.template);
  },
};

export default {
  name: 'TemplateRenderer',

  //components: () => this.components,

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
    return h({render: compile(this.template), props: {bindings: this.bindings}}, {bindings: this.bindings});
    /* return h(Temp, {
      template: this.template,
      components: this.components,
      props: {bindings: this.bindings}
    }); */
  },

};
</script>
