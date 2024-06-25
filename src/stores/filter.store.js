import { ref, computed, watch, reactive } from "vue";
import { defineStore, storeToRefs } from "pinia";
import FilterService from "../api/FilterService";
import { storeAuth } from "./auth.store";
import { storeTable } from "./table.store";
import { storeUser } from "./user.store";
import { storeNotification } from "./notification.store";
import { NOTIFICATION_TYPE } from "../constants/notification/notification";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

export const storeFilter = defineStore("storeFilter", () => {
  const authStore = storeAuth();
  const tableStore = storeTable();
  const userStore = storeUser();
  const route = useRoute();
  const notificationStore = storeNotification();
  const cupSpot = ref({});
  const loadingOrderP2P = ref(false);
  const loadingOrderSpot = ref(false);
  const timeUpdate = ref(null);
  const timeUpdateSpot = ref(null);
  const timerInterval = ref(null);
  const timerIntervalSpot = ref(null);
  const timerOrderP2P = ref(null);
  const timerUpdateUserFilterP2P = ref(null);
  const timerValidateCupSpot = ref(null);
  const selectedUserFilterP2P = ref(null);
  const selectedUserFilterSpot = ref(null);
  const selectedWatchP2P = ref(true);
  const selectedWatchSpot = ref(false);
  const resultValidateCupSpot = ref(true);
  const cupForValidate = ref(null);
  const editedFilters = reactive(new Set());
  const { t } = useI18n({ useScope: "global" });
  let controller = null;

  const filterSpot = ref({
    buyExchange: {
      name: computed(() => {
        return t("filter.filterSpot.exchangePurchases.title");
      }),
      value: [],
    },
    saleExchange: {
      name: computed(() => {
        return t("filter.filterSpot.salesExchanges.title");
      }),
      value: [],
    },
    spred: {
      min: null,
      max: null,
    },
    hideIlliquid: false,
  });

  const filterP2P = ref({
    currency: {
      name: computed(() => {
        return t("filter.filterP2P.currency.title");
      }),
      value: [],
    },
    exchenge: {
      name: computed(() => {
        return t("filter.filterP2P.exchanges.title");
      }),
      value: [],
    },
    paySystem: {
      name: computed(() => {
        return t("filter.filterP2P.paymentSystems.title");
      }),
      value: [],
    },
    cryptoCurrency: {
      name: computed(() => {
        return t("filter.filterP2P.cryptocurrency.title");
      }),
      value: [],
    },
    tradingMethod: {
      name: "Метод торговли",
      purchase: {
        maker: false,
        taker: true,
      },
      sale: {
        maker: false,
        taker: true,
      },
    },
    deposit: {
      name: "Депозит",
      value: null,
    },
    additionalFilters: {
      spred: {
        min: null,
        max: null,
      },
      limit: {
        min: null,
        max: null,
      },
      moves: "twoActions",
      purchaseSale: "ALL",
      sumDeals: { value: null },
      successfulTransactions: { value: null },
      /*successfulTransactions: {
                min: null,
                max: null,
            },*/
      provenMerchand: null,
    },
  });

  function checkNotification(fiatNames, exchanges, coinNames) {
    if (fiatNames.length < 1 || exchanges.length < 1 || coinNames.length < 1) {
      notificationStore.setNotification(
        "Ошибка",
        "Заполните все обязательные поля",
        { type: NOTIFICATION_TYPE.WARNING }
      );
      return false;
    }
    if (!filterP2P.value.additionalFilters.moves) {
      notificationStore.setNotification(
        "Ошибка",
        "Заполните все обязательные поля",
        { type: NOTIFICATION_TYPE.WARNING }
      );
      return false;
    }
    if (
      !filterP2P.value.tradingMethod.purchase.maker &&
      !filterP2P.value.tradingMethod.purchase.taker
    ) {
      notificationStore.setNotification(
        "Ошибка",
        "Заполните все обязательные поля",
        { type: NOTIFICATION_TYPE.WARNING }
      );
      return false;
    }
    if (
      !filterP2P.value.tradingMethod.sale.maker &&
      !filterP2P.value.tradingMethod.sale.taker
    ) {
      notificationStore.setNotification(
        "Ошибка",
        "Заполните все обязательные поля",
        { type: NOTIFICATION_TYPE.WARNING }
      );
      return false;
    }
    if (!filterP2P.value.additionalFilters.purchaseSale) {
      notificationStore.setNotification(
        "Ошибка",
        "Заполните все обязательные поля",
        { type: NOTIFICATION_TYPE.WARNING }
      );
      return false;
    }
    return true;
  }
  function resetFilterP2P() {
    filterP2P.value.currency.value.map((item) => {
      item.checked = false;
      return item;
    });
    filterP2P.value.exchenge.value.map((item) => {
      item.checked = false;
      return item;
    });
    filterP2P.value.paySystem.value.map((item) => {
      item.checked = false;
      return item;
    });
    filterP2P.value.cryptoCurrency.value.map((item) => {
      item.checked = false;
      return item;
    });
    filterP2P.value.deposit.value = null;
    filterP2P.value.additionalFilters.spred.min = null;
    filterP2P.value.additionalFilters.spred.max = null;
    filterP2P.value.additionalFilters.moves = "twoActions";
    filterP2P.value.additionalFilters.purchaseSale = "ALL";
    filterP2P.value.additionalFilters.sumDeals.value = null;
    filterP2P.value.additionalFilters.limit.min = null;
    filterP2P.value.additionalFilters.limit.max = null;
    filterP2P.value.additionalFilters.provenMerchand = null;
    filterP2P.value.additionalFilters.successfulTransactions.value = null;
    selectedUserFilterP2P.value = null;
    resetTradingMethod();
    timeUpdate.value = null;
  }
  function resetFilterSpot() {
    filterSpot.value.spred.min = null;
    filterSpot.value.spred.max = null;
    filterSpot.value.hideIlliquid = false;
    filterSpot.value.saleExchange.value.map((item) => {
      item.checked = false;
      return item;
    });
    filterSpot.value.buyExchange.value.map((item) => {
      item.checked = false;
      return item;
    });
    selectedUserFilterSpot.value = null;
    timeUpdateSpot.value = null;
  }
  function filterResetP2P(name) {
    for (let item in filterP2P.value) {
      if (filterP2P.value[item].name == name) {
        for (let value in filterP2P.value[item].value) {
          filterP2P.value[item].value[value].checked = false;
        }
      }
    }
    for (let item in filterSpot.value) {
      if (filterSpot.value[item].name == name) {
        for (let value in filterSpot.value[item].value) {
          filterSpot.value[item].value[value].checked = false;
        }
      }
    }
  }
  function resetTradingMethod() {
    filterP2P.value.tradingMethod.purchase.maker = false;
    filterP2P.value.tradingMethod.purchase.taker = true;
    filterP2P.value.tradingMethod.sale.maker = false;
    filterP2P.value.tradingMethod.sale.taker = true;
  }
  function setAllFilterP2P(name, allFilter) {
    for (let item in filterP2P.value) {
      if (filterP2P.value[item].name == name) {
        for (let value in filterP2P.value[item].value) {
          filterP2P.value[item].value[value].checked = allFilter;
        }
      }
    }
    for (let item in filterSpot.value) {
      if (filterSpot.value[item].name == name) {
        for (let value in filterSpot.value[item].value) {
          filterSpot.value[item].value[value].checked = allFilter;
        }
      }
    }
  }
  function delTeg(name, id) {
    if (filterP2P.value.exchenge.name == name) {
      filterP2P.value.exchenge.value.map((item) => {
        if (item.name === id.name) {
          item.checked = false;
          return item;
        }
      });
    }
    if (filterP2P.value.currency.name == name) {
      filterP2P.value.currency.value.map((item) => {
        if (item.name === id.name) {
          item.checked = false;
          return item;
        }
      });
    }
    if (filterP2P.value.paySystem.name == name) {
      filterP2P.value.paySystem.value.map((item) => {
        if (item.name === id.name) {
          item.checked = false;
          return item;
        }
      });
    }
    if (filterP2P.value.cryptoCurrency.name == name) {
      filterP2P.value.cryptoCurrency.value.map((item) => {
        if (item.name === id.name) {
          item.checked = false;
          return item;
        }
      });
    }
    if (filterSpot.value.buyExchange.name == name) {
      filterSpot.value.buyExchange.value.map((item) => {
        if (item.name === id.name) {
          item.checked = false;
          return item;
        }
      });
    }
    if (filterSpot.value.saleExchange.name == name) {
      filterSpot.value.saleExchange.value.map((item) => {
        if (item.name === id.name) {
          item.checked = false;
          return item;
        }
      });
    }
  }
  async function getOrderP2P() {
    try {
      loadingOrderP2P.value = true;
      tableStore.tableP2P = [];
      const fiatNames = [];
      const exchanges = [];
      const coinNames = [];
      const saleExchange = [];
      for (let item of filterP2P.value.currency.value.filter(
        (item) => item.checked == true
      )) {
        fiatNames.push(item.name);
      }
      for (let item of filterP2P.value.exchenge.value.filter(
        (item) => item.checked == true
      )) {
        exchanges.push(item.name.toUpperCase());
      }
      for (let item of filterP2P.value.cryptoCurrency.value.filter(
        (item) => item.checked == true
      )) {
        coinNames.push(item.name);
      }
      for (let item of filterP2P.value.paySystem.value.filter(
        (item) => item.checked == true
      )) {
        saleExchange.push(item.name);
      }
      const checkNotic = checkNotification(fiatNames, exchanges, coinNames);
      if (checkNotic) {
        const payload = {
          fiatNames: fiatNames,
          exchanges: exchanges,
          coinNames: coinNames,
          exchangeOrders: filterP2P.value.additionalFilters.purchaseSale,
          tradingMethod: {
            purchase: {
              maker: filterP2P.value.tradingMethod.purchase.maker,
              taker: filterP2P.value.tradingMethod.purchase.taker,
            },
            sale: {
              maker: filterP2P.value.tradingMethod.sale.maker,
              taker: filterP2P.value.tradingMethod.sale.taker,
            },
          },
          actions: {
            twoActions: computed(
              () => filterP2P.value.additionalFilters.moves == "twoActions"
            ).value,
            threeActions: computed(
              () => filterP2P.value.additionalFilters.moves == "threeActions"
            ).value,
          },
          merchant: {
            minCountDeals: filterP2P.value.additionalFilters.sumDeals.value,
            percentCompletedDeals:
              filterP2P.value.additionalFilters.successfulTransactions.value,
            isCertifiedMerchant:
              filterP2P.value.additionalFilters.provenMerchand,
          },
          spread: {
            minSpread: filterP2P.value.additionalFilters.spred.min,
            maxSpread: filterP2P.value.additionalFilters.spred.max,
          },
          limit: {
            minLimit: filterP2P.value.additionalFilters.limit.min,
            maxLimit: filterP2P.value.additionalFilters.limit.max,
          },
          paymentTypes: saleExchange,
          deposit: filterP2P.value.deposit.value,
        };
        if (controller) {
          controller.abort();
        }
        controller = new AbortController();
        const response = await FilterService.getOrderP2P(payload, controller);
        tableStore.saveTableP2P(response);
      }
      loadingOrderP2P.value = false;
    } catch (error) {
      loadingOrderP2P.value = false;
    }
  }
  async function getFilterP2P() {
    try {
      const payload = {
        exchanges: ["bybit"],
      };
      filterP2P.value.cryptoCurrency.value = [];
      filterP2P.value.exchenge.value = [];
      filterP2P.value.currency.value = [];
      filterP2P.value.paySystem.value = [];
      const response = await FilterService.getFilterP2P(payload);
      for (let item of response.coinNames) {
        filterP2P.value.cryptoCurrency.value.push({
          name: item,
          checked: false,
        });
      }
      for (let item of response.exchanges) {
        filterP2P.value.exchenge.value.push({ name: item, checked: false });
      }
      for (let item of response.fiatNames) {
        filterP2P.value.currency.value.push({ name: item, checked: false });
      }
      for (let item of response.paymentTypes) {
        filterP2P.value.paySystem.value.push({ name: item, checked: false });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getPaymentTypeP2P(fiatNames, exchanges) {
    try {
      const payload = {
        exchanges: exchanges,
        fiatNames: fiatNames,
      };
      const response = await FilterService.getFilterP2P(payload);

      filterP2P.value.paySystem.value = [];
      const coin = filterP2P.value.cryptoCurrency.value.filter((item) => {
        if (item.checked) return item.name;
      });
      filterP2P.value.cryptoCurrency.value = [];
      for (let item of response.paymentTypes) {
        filterP2P.value.paySystem.value.push({ name: item, checked: false });
      }
      for (let item of response.coinNames) {
        if (!!coin.find((coin) => coin.name == item))
          filterP2P.value.cryptoCurrency.value.push({
            name: item,
            checked: true,
          });
        else
          filterP2P.value.cryptoCurrency.value.push({
            name: item,
            checked: false,
          });
      }
      if (selectedUserFilterP2P.value) {
        for (let coinNames of selectedUserFilterP2P.value.coinNames) {
          filterP2P.value.cryptoCurrency.value.map((item) => {
            if (item.name.toLowerCase() == coinNames.toLowerCase()) {
              item.checked = true;
              return item;
            }
          });
        }
        for (let pay of selectedUserFilterP2P.value.paymentTypes) {
          filterP2P.value.paySystem.value.map((item) => {
            if (item.name.toLowerCase() == pay.toLowerCase()) {
              item.checked = true;
              return item;
            }
          });
        }
      }
      selectedWatchP2P.value = false;
    } catch (error) {
      console.log(error);
    }
  }
  async function getProfitSpot() {
    try {
      const buyExchange = [];
      const saleExchange = [];
      for (let item of filterSpot.value.buyExchange.value.filter(
        (item) => item.checked == true
      )) {
        buyExchange.push(item.name);
      }
      for (let item of filterSpot.value.saleExchange.value.filter(
        (item) => item.checked == true
      )) {
        saleExchange.push(item.name);
      }
      const payload = {
        isLiquid: filterSpot.value.hideIlliquid,
        maxSpread: filterSpot.value.spred.max,
        minSpread: filterSpot.value.spred.min,
        buyExchanges: buyExchange,
        sellExchanges: saleExchange,
      };
      const response = await FilterService.getProfitSpot(payload);
      tableStore.saveTableSpot(response);
    } catch (error) {
      console.log(error);
    }
  }
  function startValidateCupSpot(cup, i, activePage) {
    getOrderSpot(cup, i, activePage);
    if (timerValidateCupSpot.value) clearInterval(timerValidateCupSpot.value);
    cupForValidate.value = cup;
    timerValidateCupSpot.value = setInterval(
      () => getOrderSpot(cupForValidate.value),
      5000
    );
  }
  function finishValidateCupSpot() {
    clearInterval(timerValidateCupSpot.value);
    timerValidateCupSpot.value = null;
    resultValidateCupSpot.value = true;
  }

  async function getOrderSpot(cup, i, activePage) {
    try {
      loadingOrderSpot.value = true;
      const payload = {
        exchangeBuy: cup.exchangeBuy,
        exchangeSale: cup.exchangeSale,
        fromCoin: cup.fromCoin,
        toCoin: cup.toCoin,
      };

      const response = await FilterService.getOrderSpot(payload);
      const firstPrice = Number(response.asks[0].price);
      const secondPrice = Number(response.bids[0].price);
      const comBuy =
        Number(cupForValidate.value.commissionBuy.replace(/[^,.\d]/g, "")) /
        100;
      const comSell =
        Number(cupForValidate.value.commissionSale.replace(/[^,.\d]/g, "")) /
        100;
      let sum;
      sum =
        ((secondPrice - secondPrice * (comBuy + comSell) - firstPrice) /
          firstPrice) *
        100;
      if (sum < 0) {
        resultValidateCupSpot.value = false;
        clearInterval(timerValidateCupSpot.value);
        getProfitSpot();
      } else {
        cupSpot.value = response;
        tableStore.updateRowTableSpot(i, activePage, sum, response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingOrderSpot.value = false;
    }
  }
  async function getFilterSpot() {
    try {
      filterSpot.value.buyExchange.value = [];
      filterSpot.value.saleExchange.value = [];
      const response = await FilterService.getFilterSpot(authStore.accessToken);
      for (let item of response.buyExchanges) {
        filterSpot.value.buyExchange.value.push({ name: item, checked: false });
      }
      for (let item of response.sellExchanges) {
        filterSpot.value.saleExchange.value.push({
          name: item,
          checked: false,
        });
      }
    } catch (error) {
      notificationStore.setNotification(
        "Ошибка сервера",
        "Не удалось получить статусы фильтров",
        { type: NOTIFICATION_TYPE.ERROR }
      );
    } finally {
    }
  }
  async function editUserFilterP2P(row) {
    selectedWatchP2P.value = false;
    selectedUserFilterP2P.value = row;
    filterP2P.value.currency.value.map((item) => (item.checked = false));
    filterP2P.value.exchenge.value.map((item) => (item.checked = false));
    filterP2P.value.paySystem.value.map((item) => (item.checked = false));
    filterP2P.value.cryptoCurrency.value.map((item) => (item.checked = false));
    for (let fiatNames of row.fiatNames) {
      filterP2P.value.currency.value.map((item) => {
        if (item.name.toLowerCase() == fiatNames.toLowerCase()) {
          item.checked = true;
          return item;
        }
      });
    }
    for (let exch of row.exchanges) {
      filterP2P.value.exchenge.value.map((item) => {
        if (item.name.toLowerCase() == exch.toLowerCase()) {
          item.checked = true;
          return item;
        }
      });
    }
    for (let pay of row.paymentTypes) {
      filterP2P.value.paySystem.value.map((item) => {
        if (item.name.toLowerCase() == pay.toLowerCase()) {
          item.checked = true;
          return item;
        }
      });
    }
    for (let coinNames of row.coinNames) {
      filterP2P.value.cryptoCurrency.value.map((item) => {
        if (item.name.toLowerCase() == coinNames.toLowerCase()) {
          item.checked = true;
          return item;
        }
      });
    }
    filterP2P.value.deposit.value = row.deposit;
    filterP2P.value.additionalFilters.spred.min = row.spread.minSpread;
    filterP2P.value.additionalFilters.spred.max = row.spread.maxSpread;
    if (row.actions.twoActions)
      filterP2P.value.additionalFilters.moves = "twoActions";
    if (row.actions.threeActions)
      filterP2P.value.additionalFilters.moves = "threeActions";
    filterP2P.value.additionalFilters.purchaseSale = row.exchangeOrders;
    filterP2P.value.additionalFilters.sumDeals.value =
      row.merchant.minCountDeals;
    filterP2P.value.additionalFilters.successfulTransactions.value =
      row.merchant.percentCompletedDeals;
    filterP2P.value.additionalFilters.limit.min = row.limit.minLimit;
    filterP2P.value.additionalFilters.limit.max = row.limit.maxLimit;
    filterP2P.value.additionalFilters.provenMerchand =
      row.merchant.isCertifiedMerchant;
    filterP2P.value.tradingMethod.purchase.maker =
      row.tradingMethod.purchase.maker;
    filterP2P.value.tradingMethod.purchase.taker =
      row.tradingMethod.purchase.taker;
    filterP2P.value.tradingMethod.sale.maker = row.tradingMethod.sale.maker;
    filterP2P.value.tradingMethod.sale.taker = row.tradingMethod.sale.taker;

    selectedWatchP2P.value = false;
  }
  function editUserFilterSpot(row) {
    selectedWatchSpot.value = true;
    selectedUserFilterSpot.value = row;
    filterSpot.value.buyExchange.value.map((item) => (item.checked = false));
    filterSpot.value.saleExchange.value.map((item) => (item.checked = false));
    for (let buyExchanges of row.buyExchanges) {
      filterSpot.value.buyExchange.value.map((item) => {
        if (item.name.toLowerCase() == buyExchanges.toLowerCase()) {
          item.checked = true;
          return item;
        }
      });
    }
    for (let sellExchanges of row.sellExchanges) {
      filterSpot.value.saleExchange.value.map((item) => {
        if (item.name.toLowerCase() == sellExchanges.toLowerCase()) {
          item.checked = true;
          return item;
        }
      });
    }
    filterSpot.value.spred.min = row.minSpread;
    filterSpot.value.spred.max = row.maxSpread;
    filterSpot.value.hideIlliquid = row.isLiquid;
  }
  async function saveUserFilterP2P(row) {
    editUserFilterP2P(row);
    editedFilters.delete(selectedUserFilterP2P.value.filterName);
    await userStore.updateUserFilter(
      selectedUserFilterP2P.value.filterName,
      filterP2P.value,
      "P2P"
    );
  }
  async function saveUserFilterSpot(row) {
    editUserFilterSpot(row);
    editedFilters.delete(selectedUserFilterSpot.value.filterName);
    await userStore.updateUserFilter(
      selectedUserFilterSpot.value.filterName,
      filterSpot.value,
      "SPOT"
    );
  }
  function changeCurrentUserFilterP2P() {
    const fiatNames = [];
    const exchanges = [];
    const coinNames = [];
    const saleExchange = [];
    for (let item of filterP2P.value.currency.value.filter(
      (item) => item.checked == true
    )) {
      fiatNames.push(item.name);
    }
    for (let item of filterP2P.value.exchenge.value.filter(
      (item) => item.checked == true
    )) {
      exchanges.push(item.name.toUpperCase());
    }
    for (let item of filterP2P.value.cryptoCurrency.value.filter(
      (item) => item.checked == true
    )) {
      coinNames.push(item.name);
    }
    for (let item of filterP2P.value.paySystem.value.filter(
      (item) => item.checked == true
    )) {
      saleExchange.push(item.name);
    }
    const payload = {
      filterName: selectedUserFilterP2P.value.filterName,
      actions: {
        twoActions: computed(
          () => filterP2P.value.additionalFilters.moves == "twoActions"
        ).value,
        threeActions: computed(
          () => filterP2P.value.additionalFilters.moves == "threeActions"
        ).value,
      },
      coinNames: coinNames,
      deposit: filterP2P.value.deposit.value,
      exchangeOrders: filterP2P.value.additionalFilters.purchaseSale,
      exchanges: exchanges,
      fiatNames: fiatNames,
      isCertifiedMerchant: null,
      limit: {
        minLimit: filterP2P.value.additionalFilters.limit.min,
        maxLimit: filterP2P.value.additionalFilters.limit.max,
      },
      merchant: {
        minCountDeals: filterP2P.value.additionalFilters.sumDeals.value,
        isCertifiedMerchant: filterP2P.value.additionalFilters.provenMerchand,
        percentCompletedDeals:
          filterP2P.value.additionalFilters.successfulTransactions.value,
      },
      paymentTypes: saleExchange,
      spread: {
        minSpread: filterP2P.value.additionalFilters.spred.min,
        maxSpread: filterP2P.value.additionalFilters.spred.max,
      },
      tradingMethod: {
        purchase: {
          maker: filterP2P.value.tradingMethod.purchase.maker,
          taker: filterP2P.value.tradingMethod.purchase.taker,
        },
        sale: {
          maker: filterP2P.value.tradingMethod.sale.maker,
          taker: filterP2P.value.tradingMethod.sale.taker,
        },
      },
    };
    selectedUserFilterP2P.value = payload;
  }
  function changeCurrentUserFilterSpot() {
    const buyExchange = [];
    const saleExchange = [];
    for (let item of filterSpot.value.buyExchange.value.filter(
      (item) => item.checked == true
    )) {
      buyExchange.push(item.name);
    }
    for (let item of filterSpot.value.saleExchange.value.filter(
      (item) => item.checked == true
    )) {
      saleExchange.push(item.name);
    }
    const payload = {
      buyExchanges: buyExchange,
      sellExchanges: saleExchange,
      minSpread: filterSpot.value.spred.min,
      maxSpread: filterSpot.value.spred.max,
      isLiquid: filterSpot.value.hideIlliquid,
      filterType: "SPOT",
      filterName: selectedUserFilterSpot.value.filterName,
    };

    selectedUserFilterSpot.value = payload;
  }

  async function deleteUserFilter(filterName, filterType) {
    try {
      const payload = {
        filterType: filterType,
        filterName: filterName,
      };
      const response = await FilterService.deleteUserFilter(payload);
      notificationStore.setNotification("", "Профиль фильтра успешно удален", {
        type: NOTIFICATION_TYPE.SUCCESS,
      });
      userStore.getUserInfo();
    } catch (error) {
      console.log(error);
    }
  }

  watch(filterSpot.value, () => {
    if (!selectedWatchSpot.value) selectedUserFilterSpot.value = "";
    if (!authStore.isLogin) return;
    if (
      selectedUserFilterSpot.value &&
      selectedWatchSpot.value &&
      editedFilters.has(selectedUserFilterSpot.value.filterName)
    ) {
      changeCurrentUserFilterSpot();
      const index = userStore.userFiltersSpot.findIndex(
        (item) => item.filterName == selectedUserFilterSpot.value.filterName
      );
      if (index >= 0) {
        userStore.userFiltersSpot.splice(index, 1, {
          ...selectedUserFilterSpot.value,
        });
      }
    }
    selectedWatchSpot.value = true;
    setTimeout(getProfitSpot, 1000);
  });
  watch(filterP2P.value, () => {
    if (!authStore.isLogin) return;
    if (timerOrderP2P.value) {
      clearTimeout(timerOrderP2P.value);
      if (controller) {
        controller.abort();
      }
    }
    if (
      selectedUserFilterP2P.value &&
      selectedWatchP2P.value &&
      editedFilters.has(selectedUserFilterP2P.value.filterName)
    ) {
      changeCurrentUserFilterP2P();
      const index = userStore.userFiltersP2P.findIndex(
        (item) => item.filterName == selectedUserFilterP2P.value.filterName
      );
      if (index >= 0) {
        userStore.userFiltersP2P.splice(index, 1, {
          ...selectedUserFilterP2P.value,
        });
      }
    }
    selectedWatchP2P.value = true;
    timerOrderP2P.value = setTimeout(getOrderP2P, 1000);
  });
  watch(timeUpdate, () => {
    clearInterval(timerInterval.value);
    if (!authStore.isLogin) {
      timeUpdate.value = null;
      return;
    }
    if (timeUpdate.value) {
      timerInterval.value = setInterval(getOrderP2P, timeUpdate.value);
    }
  });
  watch(timeUpdateSpot, () => {
    clearInterval(timerIntervalSpot.value);
    if (!authStore.isLogin) {
      timeUpdateSpot.value = null;
      return;
    }
    if (timeUpdateSpot.value) {
      timerIntervalSpot.value = setInterval(
        getProfitSpot,
        timeUpdateSpot.value
      );
    }
  });
  watch(route, () => {
    const lastSelectedP2P = userStore.userInfo?.userFilters?.userP2PFilters.find(
      (filter) => {
        return filter.isLastSelected;
      }
    );
    lastSelectedP2P && editUserFilterP2P(lastSelectedP2P);

    const lastSelectedSpot =
      userStore.userInfo?.userFilters?.userSpotFilters.find((filter) => {
        return filter.isLastSelected;
      });
    lastSelectedSpot && editUserFilterSpot(lastSelectedSpot);

    if (route.name != "P2P") timeUpdate.value = null;
    if (route.name != "Spot") timeUpdateSpot.value = null;
  });
  watch([filterP2P.value.currency, filterP2P.value.exchenge], () => {
    const fiatNames = [];
    const exchanges = [];
    for (let item of filterP2P.value.currency.value.filter(
      (item) => item.checked == true
    )) {
      fiatNames.push(item.name);
    }
    for (let item of filterP2P.value.exchenge.value.filter(
      (item) => item.checked == true
    )) {
      exchanges.push(item.name.toUpperCase());
    }
    if (fiatNames.length > 0 && exchanges.length > 0)
      getPaymentTypeP2P(fiatNames, exchanges);
    else filterP2P.value.paySystem.value = [];
  });
  watch(filterP2P.value.paySystem, () => {
    filterP2P.value.paySystem.value = filterP2P.value.paySystem.value.sort(
      (a, b) => b.checked - a.checked
    );
  });

  return {
    filterSpot,
    filterP2P,
    cupSpot,
    loadingOrderP2P,
    loadingOrderSpot,
    timeUpdate,
    timeUpdateSpot,
    selectedUserFilterP2P,
    selectedUserFilterSpot,
    controller,
    resultValidateCupSpot,

    resetFilterP2P,
    resetFilterSpot,
    filterResetP2P,
    setAllFilterP2P,
    resetTradingMethod,
    startValidateCupSpot,
    finishValidateCupSpot,

    getFilterSpot,
    getOrderSpot,
    getOrderP2P,
    getFilterP2P,
    getProfitSpot,
    deleteUserFilter,
    delTeg,

    editUserFilterP2P,
    editUserFilterSpot,
    saveUserFilterP2P,
    selectedWatchP2P,
    editedFilters,
    saveUserFilterSpot,
  };
});
