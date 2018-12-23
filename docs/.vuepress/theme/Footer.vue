<template>
  <footer class="footer">
    <div class="container">
      <p class="text-right">
        made somewhere in the internet with
        <span class="f-heart">&#9829;</span>
        by vicvinc since @2016-{{ year }}
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "theme-footer",
  data() {
    const tm = new Date(Date.now());
    const year = tm.getFullYear();
    return {
      year
    };
  }
};
</script>

<style lang="scss">
.footer {
  margin: 0 auto;
  background: #1b1b1d;
  text-align: center;
  width: 100%;
  padding: 15px 0;
}

.footer p {
  color: #fafafa;
}

.footer .f-heart {
  color: #fc636b;
}
</style>
