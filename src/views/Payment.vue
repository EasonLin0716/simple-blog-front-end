<template>
  <div id="payment">
    <h4 class="text-center">Just a little paperwork.</h4>
    <h5 class="text-center">We’ll have you reading again shortly.</h5>
    <h6>PLAN</h6>
    <div id="buttons">
      <label class="container">
        $50/year (save $10)
        <input type="radio" name="payment" checked="checked" />
        <span class="checkmark rounded-circle"></span>
      </label>
      <label class="container">
        $5/month
        <input type="radio" name="payment" />
        <span class="checkmark rounded-circle"></span>
      </label>
    </div>
    <h6>PAYMENT</h6>
    <form action="/">
      <PaymentCreditCardForm />
    </form>
  </div>
</template>

<script>
import PaymentCreditCardForm from '../components/PaymentCreditCardForm'
export default {
  name: 'Payment',
  components: { PaymentCreditCardForm }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
h5 {
  font-size: 18px;
  color: #aaa;
  font-weight: 400;
}

h6 {
  font-size: $text-small;
  color: #aaa;
  font-weight: 400;
  margin: 15px 0;
}

#payment {
  max-width: 482px;
  margin: 0 auto;
  padding: 24px 16px 16px;
}

/*=== radio button css ===*/
.container {
  display: block;
  position: relative;
  padding-left: 28px;
  margin: 20px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
  .checkmark {
    position: absolute;
    top: 3px;
    left: 0;
    height: 18px;
    width: 18px;
    border: 0.5px solid #ccc;
  }
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  // Blue dot
  .checkmark:after {
    top: 2.5px;
    left: 2.5px;
    width: 12px;
    height: 12px;
    background: $dodger-blue;
    border-radius: 50%;
  }
}
</style>
