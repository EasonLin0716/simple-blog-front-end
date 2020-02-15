<template>
  <div id="credit-card-form">
    <div class="row" id="options">
      <span
        class="col-6"
        @click="options = 'credit-card'"
        :style="options === 'credit-card' ? chosen : ''"
        >Credit card</span
      >
      <span
        class="col-6"
        @click="options = 'paypal'"
        :style="options === 'paypal' ? chosen : ''"
        >Paypal</span
      >
    </div>
    <template v-if="options === 'credit-card'">
      <div id="ccnumber">
        <label for="ccnumber" class="cc-label">Credit card number</label>
        <div id="ccNumber-input" class="cc-input">
          <font-awesome-icon :icon="['far', 'credit-card']" id="credit-card" />
          <input
            name="ccnumber"
            type="text"
            v-model="ccNumber"
            @keypress="onKeyPress"
            maxlength="16"
            placeholder="5555555555554444"
          />
        </div>
      </div>
      <div id="cc-exp-sc" class="row">
        <div class="col-5">
          <label for="ccexp" class="cc-label">Expiration</label>
          <input
            class="cc-input"
            name="ccexp"
            type="text"
            v-model="ccExp"
            @keypress="onKeyPress"
            maxlength="4"
            placeholder="0325"
          />
        </div>
        <div class="col-7">
          <label for="ccsc" class="cc-label">Security Code</label>
          <input
            class="cc-input"
            name="ccsc"
            type="text"
            v-model="ccSc"
            @keypress="onKeyPress"
            maxlength="3"
            placeholder="123"
          />
        </div>
      </div>
      <p id="notice">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere alias
        consectetur tempore at reprehenderit rem, dolorum rerum. Voluptatum
        facilis, vitae illum, quia consequatur amet natus quasi iure adipisci
        nam maxime.
      </p>
      <div class="text-center">
        <button type="submit" class="btn btn-dark center-block px-4">
          Start my membership
        </button>
      </div>
    </template>
    <template v-else>
      <p id="notice" class="mt-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est sequi
        maxime libero id distinctio veniam voluptatibus recusandae similique,
        perferendis vel expedita magnam voluptas quae sit nemo facere in vero
        laudantium.
      </p>
      <div class="text-center">
        <button type="submit" class="btn btn-dark center-block px-4">
          <font-awesome-icon :icon="['fab', 'paypal']" id="paypal" />
          &nbsp;Paypal&nbsp;<span id="checkout">結帳</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
// :value="ccFormat(value)"
export default {
  name: 'PaymentCreditCardForm',
  data() {
    return {
      ccNumber: '',
      ccExp: '',
      ccSc: '',
      options: 'credit-card',
      chosen: {
        borderBottom: '3px solid rgb(33,135,153)',
        color: ' rgb(33,135,153)'
      }
    }
  },
  computed: {},
  methods: {
    onKeyPress: function(evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

p {
  color: #aaa;
  font-size: $text-small;
  font-weight: 400;
}

input {
  border: none;
  outline: none;
}

label {
  display: block;
}

.cc-input {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.cc-label {
  color: #555;
}

.chosen {
  border-bottom: 3px solid $dodger-blue;
  color: $dodger-blue;
}

#checkout {
  font-size: 10px;
}

#credit-card-form {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  #options {
    padding: 0 15px;
    * {
      display: flex;
      justify-content: center;
      padding: 10px 0;
      cursor: pointer;
      border-bottom: 1px solid #ccc;
    }
  }
  #ccnumber {
    margin: 15px auto;
    border-bottom: 1px solid #ccc;
    #credit-card {
      color: #ccc;
      width: 28px;
      height: auto;
    }
    input {
      margin-left: 10px;
    }
  }
}

#cc-exp-sc {
  margin-bottom: 15px;
  input {
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
}
</style>
