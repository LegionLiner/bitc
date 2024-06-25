<template>
  <footer class="footer--service">
    <a href="#">Отказ от ответственности</a>
    <a href="#">Тарифы</a>
    <a href="#">API для данных P2P</a>
    <a href="#">FAQ</a>
    <a href="#">Партнерская программа</a>
    <a href="#">Контакты</a>
    <a href="#">Политика конфиденциальности</a>

  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer--service {
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: 2%;
  border-radius: 10px;
  background-color: rgb(248, 250, 252);
  -webkit-box-shadow: 4px 4px 31px -12px rgba(34, 60, 80, 0.15);
  padding: 5px;
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    padding: 12px;
    justify-content: start;
  }
}

.footer--service a {
  font-size: 14px;
  font-weight: 400;
  color: #828d96;
  text-decoration: none;
  padding: 18px;
  text-align: center;
  align-items: center;
  display: block;

  @media screen and (max-width: 900px) {
    padding: 12px;
    margin: 0;
  }
}
</style>

