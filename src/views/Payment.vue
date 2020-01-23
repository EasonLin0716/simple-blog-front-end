<template>
  <div id="payment">
    <h4>Just a little paperwork.</h4>
    <h5>We’ll have you reading again shortly.</h5>
    <h6>PLAN</h6>
    <div id="buttons">
      <label class="container">
        $50/year (save $10)
        <input type="radio" name="payment" checked="checked" />
        <span class="checkmark"></span>
      </label>
      <label class="container">
        $5/month
        <input type="radio" name="payment" />
        <span class="checkmark"></span>
      </label>
    </div>
    <h6>PAYMENT</h6>
    <form action="/">
      <CreditCardForm />
    </form>
  </div>
</template>

<script>
import CreditCardForm from '../components/CreditCardForm'
export default {
  name: 'Payment',
  components: { CreditCardForm }
}
</script>

<style lang="scss" scoped>
h4,
h5 {
  text-align: center;
}

h5 {
  font-size: 18px;
  color: #aaa;
  font-weight: 400;
}

h6 {
  font-size: 14px;
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
    border-radius: 50%;
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
    border-radius: 50%;
    background: #218799;
  }
}
</style>
