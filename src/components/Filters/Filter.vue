<template>
    <div class="filter" ref="filterRef">
        <div class="btn" @click="toggleShow" :class="({
            btn_active: isShow,
            btn_choise: !!countSelected,
            btn_required: required && !countSelected,
        })">
            <div class="btn_inner" v-if="!singleСhoice">
                <div class="btn__title">{{ name }}</div>
                <div class="count">
                    <IconText v-for="(tag, index) in tags" :name="tag.name" :typeIcon="typeIcon" :showText="false"
                        class="choosen_icon" :style="{ 'z-index': index, 'display': index < 4 ? 'flex' : 'none' }"
                        :class="{ 'choosen_icon_active': index > 0 }">
                    </IconText>
                    <div class="btn__count" v-if="!!countSelected && tags.length > 4">
                        + {{ tags.length - 4 }}
                    </div>
                </div>
            </div>
            <div class="btn_inner" v-else>
                <div class="btn__title">{{ name }}</div>
                <div class="count">
                    <component v-if="!!countSelected"
                        :is="BANK[tagName] || STOCK[tagName] || CRYPTO[tagName] || LANGUAGE[tagName]" />
                    {{ tagName }}
                </div>
            </div>
            <div class="count">
                <ArrowUp v-if="isShow" />
                <ArrowDown v-else />
            </div>
        </div>
        <div class="btn__mobile" @click="toggleShow" :class="({
            btn__mobile_active: isShow,
            btn__mobile_choise: !!countSelected,
            btn__mobile_required: required && !countSelected,
        })">
            <div class="btn__title">{{ name }}</div>
            <div class="btn__mobile_icon">
                <div class="count" v-if="!singleСhoice">
                    <div class="count">
                        <IconText v-for="(tag, index) in tags" :name="tag.name" :typeIcon="typeIcon" :showText="false"
                            class="choosen_icon"
                            :style="{ 'z-index': index, 'display': index < 4 ? 'flex' : 'none', 'width': '20px' }"
                            :class="{ 'choosen_icon_active': index > 0 }">
                        </IconText>
                        <div class="btn__count" v-if="!!countSelected && tags.length > 4">
                            + {{ tags.length - 4 }}
                        </div>
                    </div>
                </div>
                <div class="count" v-else>
                    <IconText :name="tagName" :typeIcon="typeIcon" :showText="false" class="choosen_icon"
                        :class="{ 'choosen_icon_active': index > 0 }" />
                </div>
                <div class="count last">
                    <ArrowUp v-if="isShow" />
                    <ArrowDown v-else />
                </div>
            </div>
        </div>
        <div class="modal" v-if="isShow" :class="{ 'to_top': toTop }">
            <div class="modal__title">
                <div class="">{{ name }}</div>
                <div class="modal__drop" @click="resetFilter">
                    {{ $t("filter.reset") }}
                </div>
            </div>
            <div class="search">
                <!-- <div class="search__tag">
                    <span v-for="i of tags" class="search__tag_span">
                        <CloseSmall class="cursor" @click="delTeg(i)" />{{ i.name }}
                    </span>
                </div> -->
                <input type="text" class="search__input" :placeholder="placeholder" v-model="inputValue" />
            </div>
            <div class="checkbox">
                <div class="checkbox__item" v-if="filterValue.length > 0 && allBtn">
                    <Checkbox :title="$t('filter.all')" v-model="allFilter" @change="setAllFilterP2P" />
                </div>
                <div class="checkbox__item" v-for="item of filter">
                    <Checkbox :title="item.name" v-model="item.checked" @change="changeSingleChoise(item.name)"
                        :icon="true" :length="length" :typeIcon="typeIcon" />
                </div>
            </div>
        </div>
        <BackGround v-if="isShow" @click="hideShow"></BackGround>
    </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import clickOutside from "../../directives/clickOutSide";
import { BackGround } from "../UI";
import { ArrowUp, ArrowDown, CloseSmall } from "../Icons";
import { Checkbox } from "../UI";
import { storeFilter } from "../../stores/filter.store";
import { BANK, STOCK, CRYPTO, LANGUAGE } from "../../constants/enum";
import IconText from "../Sistem/IconText.vue";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    filterValue: {
        type: Array,
        required: true,
    },
    placeholder: {
        type: String,
    },
    allBtn: {
        type: Boolean,
        default: true,
    },
    singleСhoice: {
        type: Boolean,
        default: false,
    },
    length: {
        type: Boolean,
    },
    required: {
        type: Boolean,
        default: false,
    },
    typeIcon: {
        type: String
    },
    toTop: {
        type: Boolean,
    },
    selectedFilter: {
        type: String
    }
});
const emit = defineEmits(["changeSingleChoise"], ["delTag"]);

const filterStore = storeFilter();
const filterRef = ref(null);
const isShow = ref(false);
const allFilter = ref(false);
const inputValue = ref(null);

clickOutside(filterRef, hideShow);

const filter = computed(() => {
    if (!inputValue.value) return props.filterValue;
    return props.filterValue.filter((item) => {
        return String(item.name).toLowerCase().includes(String(inputValue.value).toLowerCase());
    });
});
const tags = computed(() => {
    return props.filterValue.filter((item) => item.checked);
});
const countSelected = computed(() => {
    return tags.value.length
});
const tagName = computed(() => (tags.value.length ? tags.value[0].name : null));


function hideShow() {
    isShow.value = false;
}

function toggleShow() {
    isShow.value = !isShow.value;
}

function resetFilter() {
    filterStore.editedFilters.add(props.selectedFilter);
    filterStore.filterResetP2P(props.name);
}

function setAllFilterP2P() {
    filterStore.editedFilters.add(props.selectedFilter);
    filterStore.setAllFilterP2P(props.name, allFilter.value);
}
function changeSingleChoise(name) {
    filterStore.editedFilters.add(props.selectedFilter);
    if (props.singleСhoice) {
        emit("changeSingleChoise", name);
    }
}

function init() {
    for (let item of props.filterValue) {
        if (!item.checked) {
            return (allFilter.value = false);
        }
    }
    allFilter.value = true;
}

watch(
    () => props.filterValue,
    () => {
        init();
    },
    { deep: true }
);
</script>

<style lang="scss" scoped>
.filter {
    user-select: none;
    position: relative;
}

.required {
    width: 12px;
    height: 12px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(6px, -6px);
    background-image: url("../Icons/System/Required.svg");
}

.btn {
    cursor: pointer;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    min-width: 150px;
    height: 44px;
    border-radius: 8px;
    justify-content: space-between;
    background: #ffffff;
    color: #828d96;


    .btn_inner {
        height: 100%;
    }

    &__title {
        font-size: 11px !important;
        color: rgba(130, 141, 150, 1);
    }

    &_required {
        border: 1px solid rgb(77, 128, 239);
    }

    &__title {
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        margin-right: 6px;
    }

    &__count {
        display: flex;
        height: 18px;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        background: rgba(229, 241, 253, 1);
        color: rgba(104, 151, 251, 1);
        font-size: 10px;
        font-weight: 600;
        line-height: 16px;
        padding: 4px 2px;
    }

    &_choise {
        background: #ffffff;
        color: #272d37;
    }

    &_active {
        border: 1px solid #4d80ef;
        z-index: 12;
        position: relative;
    }

    &__mobile {
        display: none;
        position: relative;

        @media screen and (max-width: 900px) {
            cursor: pointer;
            padding: 0px 12px;
            display: flex;
            align-items: center;
            min-width: 120px;
            height: 40px;
            border-radius: 8px;
            justify-content: space-between;
            border: 1px solid #eaecf0;
            background: #ffffff;
            color: #828d96;
            position: relative;
        }

        .btn__title {
            font-size: 10px !important;
            position: absolute;
            top: 0px;
        }

        &_icon {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            width: -webkit-fill-available;
            margin-top: 12px;
        }

        &_choise {
            background: #f8fafc;
            color: #272d37;
        }

        &_active {
            border: 1px solid #4d80ef;
            z-index: 12;
        }

        &_required {
            border: 1px solid rgb(77, 128, 239);
        }
    }

    @media screen and (max-width: 900px) {
        display: none;
    }
}

.modal {
    position: absolute;
    background-color: #fff;
    border: 1px solid #eaecf0;
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
    display: inline-block;
    z-index: 1000;

    &.to_top {
        bottom: 100%;
        width: 100%;
    }

    @media screen and (max-width: 900px) {
        width: 100%;
    }

    &__title {
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solid #eaecf0;
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
    }

    &__drop {
        color: #828d96;
        cursor: pointer;
    }
}

.search {
    width: 100%;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__input {
        width: 100%;
        height: 40px;
        padding: 8px 12px;
        align-items: center;
        gap: 6px;
        align-self: stretch;
        border-radius: 8px;
        border: 1px solid #eaecf0;
        background: #fff;
        color: var(--828D96, #828d96);
        font-size: 14px;
        font-weight: 500;
    }

    &__input:focus {
        outline: none;
    }

    &__tag {
        font-size: 11px;
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        max-height: 49px;
        overflow: auto;

        &_span {
            background: #f5f5f5;
            border-radius: 8px;
            padding: 3px 8px;
            display: flex;
            align-items: center;
            gap: 3px;
        }
    }
}

.checkbox {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    max-height: 300px;
    overflow: auto;
    padding-top: 0;

    &__item {
        min-width: 45%;
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 900px) {
        max-height: 250px;
    }
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    width: 6px;
    border-radius: 10px;
    background: #f8fafc;
}

::-webkit-scrollbar-thumb {
    width: 6px;
    border-radius: 10px;
    background: #eaf0fb;
}

.count {
    height: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    .choosen_icon {
        width: 20px !important;

        &.choosen_icon_active {
            margin-left: -10px;
        }
    }

    &.last {
        margin-bottom: 12px !important;
    }
}

.cursor {
    cursor: pointer;
}
</style>
