{/*<div class="btn" @click="toggleShow" :class="({
            btn_active: isShow,
            btn_choise: !!countSelected,
            btn_required: required && !countSelected,
        })">
            <div class="btn__title">{{ name }}</div>
            <div class="count" v-if="!singleСhoice">
                <div class="btn__count" v-if="!!countSelected">
                    {{ countSelected }}
                </div>
            </div>
            <div class="count" v-else>
                <component v-if="!!countSelected"
                    :is="BANK[tagName] || STOCK[tagName] || CRYPTO[tagName] || LANGUAGE[tagName]" />
            </div>
            <div class="count">
                <ArrowUp v-if="isShow" />
                <ArrowDown v-else />
            </div>
        </div>*/}