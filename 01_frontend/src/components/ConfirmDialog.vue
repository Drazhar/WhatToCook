<template>
  <popup-modal ref="popup">
    <h2 style="margin-top: 0">{{ title }}</h2>
    <p>{{ message }}</p>
    <div class="btns">
      <button class="cancel-btn" @click="_cancel">{{ cancelButton }}</button>
      <span class="ok-btn" @click="_confirm">{{ okButton }}</span>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from "./PopupModal.vue"

export default {
  name: "ConfirmDialog",

  components: { PopupModal },

  data: () => ({
    title: undefined,
    message: undefined,
    okButton: undefined,
    cancelButton: "Go Back",

    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title
      this.message = opts.message
      this.okButton = opts.okButton
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton
      }
      this.$refs.popup.open()
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.$refs.popup.close()
      this.resolvePromise(true)
    },

    _cancel() {
      this.$refs.popup.close()
      this.resolvePromise(false)
    },
  },
}
</script>

<style scoped>
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ok-btn {
  color: var(--red);
  text-decoration: underline;
  line-height: 2.5rem;
  cursor: pointer;
}

.cancel-btn {
  padding: 0.5em 1em;
  background-color: var(--blue);
  color: var(--white);
  border: none;
  border-radius: 4px;
  font-weight: normal;
  font-size: 16px;
  cursor: pointer;
}
</style>
