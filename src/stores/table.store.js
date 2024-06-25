import { ref, computed, watch, onMounted } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { store } from "./index";
import TableService from "../api/TableService";

export const storeTable = defineStore("storeTable", () => {
  //state
  const tableP2P = ref([]);
  const tableSpot = ref([]);
  const timerIntervalProccesP2P = ref(null);
  const tableIntervalProccesP2P = ref(null);
  const resultValideteOrdersP2P = ref(null);
  const indexElemTableSpot = ref(null);
  const activePageTableSpot = ref(null);
  const rowSpot = ref(null);
  const useStore = store();
  const { paginatorPerPage } = storeToRefs(useStore);
  //getters

  //actions
  function saveTableSpot(table) {
    tableSpot.value = table;
  }
  function saveTableP2P(table) {
    tableP2P.value = table;
  }

  function sortSpred() {
    tableP2P.value.sort((a, b) => (a.profit > b.profit ? 1 : -1));
  }

  function startValideteOrdersP2P(table) {
    if (timerIntervalProccesP2P.value)
      clearInterval(timerIntervalProccesP2P.value);
    tableIntervalProccesP2P.value = table;
    timerIntervalProccesP2P.value = setInterval(validateOrders, 3000);
  }
  function stopValideteOrdersP2P() {
    clearInterval(timerIntervalProccesP2P.value);
    tableIntervalProccesP2P.value = null;
    resultValideteOrdersP2P.value = null;
  }
  function updateRowTableSpot(
    i = indexElemTableSpot.value,
    activePage = activePageTableSpot.value,
    profit,
    cupSpot
  ) {
    indexElemTableSpot.value = i;
    activePageTableSpot.value = activePage;
    rowSpot.value =
      paginatorPerPage.value * activePageTableSpot.value +
      indexElemTableSpot.value -
      paginatorPerPage.value;
    tableSpot.value[rowSpot.value].profit = profit;
    tableSpot.value[rowSpot.value].priceBuy = cupSpot.asks[0].price;
    tableSpot.value[rowSpot.value].priceSale = cupSpot.bids[0].price;
  }
  function spreadForCup(ask, bid) {
    const firstPrice = Number(ask);
    const secondPrice = Number(bid);
    tableSpot.value[rowSpot.value];
    const comBuy =
      Number(
        tableSpot.value[rowSpot.value].commissionBuy.replace(/[^,.\d]/g, "")
      ) / 100;
    const comSell =
      Number(
        tableSpot.value[rowSpot.value].commissionSale.replace(/[^,.\d]/g, "")
      ) / 100;
    let sum;
    sum =
      ((secondPrice - secondPrice * (comBuy + comSell) - firstPrice) /
        firstPrice) *
      100;
    return sum;
  }

  async function validateOrders() {
    try {
      const payload = {
        buyOrder: {
          exchangeName: tableIntervalProccesP2P.value.actions[0].exchangeName,
          merchantName: tableIntervalProccesP2P.value.actions[0].merchantName,
          coinName: tableIntervalProccesP2P.value.actions[0].coinName,
          fiatName: tableIntervalProccesP2P.value.actions[0].fiatName,
          price: tableIntervalProccesP2P.value.actions[0].price,
        },
        sellOrder: {
          exchangeName:
            tableIntervalProccesP2P.value.actions[
              tableIntervalProccesP2P.value.actions.length - 1
            ].exchangeName,
          merchantName:
            tableIntervalProccesP2P.value.actions[
              tableIntervalProccesP2P.value.actions.length - 1
            ].merchantName,
          coinName:
            tableIntervalProccesP2P.value.actions[
              tableIntervalProccesP2P.value.actions.length - 1
            ].coinName,
          fiatName:
            tableIntervalProccesP2P.value.actions[
              tableIntervalProccesP2P.value.actions.length - 1
            ].fiatName,
          price:
            tableIntervalProccesP2P.value.actions[
              tableIntervalProccesP2P.value.actions.length - 1
            ].price,
        },
      };
      const res = await TableService.validateOrders(payload);
      if (res) resultValideteOrdersP2P.value = res;
      else {
        stopValideteOrdersP2P();
      }
    } catch (e) {
      console.log(e);
    }
  }

  onMounted(() => {
    tableP2P.value = tableP2P.value.map((item, index) => {
      item.id = index;
      return item;
    });
  });

  return {
    tableP2P,
    tableSpot,
    resultValideteOrdersP2P,

    sortSpred,
    saveTableSpot,
    saveTableP2P,
    startValideteOrdersP2P,
    stopValideteOrdersP2P,
    updateRowTableSpot,
    spreadForCup,

    validateOrders,
  };
});
