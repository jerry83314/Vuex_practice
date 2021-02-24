<template>
  <div>
    <select name="" id="" v-model="form.options">
      <option>請選擇</option>
      <option value="Boy">Boy</option>
    </select>
    <button @click.prevent="getMyFromFn">審核中</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        options: '',
      },
    };
  },
  created() {
    this.form = this.$store.state.myForm;
  },
  methods: {
    getMyFromFn() {
      console.log('test');
      this.$store.dispatch('getOriginalForm', this.form);
      console.log('test2');
      this.$router.push('/');
    },
  },
};
</script>
