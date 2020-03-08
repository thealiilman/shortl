class Alert {
  message: string
  type: string
  alertElement: HTMLDivElement

  constructor(message: string, type: string) {
    this.message = message
    this.type = type
    this.alertElement = document.querySelector('.alert-container')
  }

  static timerId: null|number

  static renderWithMessageAndType = (message: string, type: string): void => {
    if (Alert.timerId) {
      window.clearTimeout(Alert.timerId)
    }

    new Alert(message, type).renderWithMessageAndType()
  }

  private renderWithMessageAndType = (): void => {
    this.alertElement.classList.add(this.type)
    this.alertElement.querySelector('p').textContent = this.message

    Alert.timerId = window.setTimeout(() => {
      this.alertElement.classList.add('fade-out')
      this.alertElement.addEventListener('animationend', () => {
        if (this.alertElement.classList.contains('fade-out')) {
          this.alertElement.querySelector('p').textContent = null
          this.alertElement.classList.remove(this.type)
          this.alertElement.classList.remove('fade-out')
        }
      })
    }, 5000)
  }
}

export const showAlert = (message: string, type: string): void => {
  Alert.renderWithMessageAndType(message, type)
}
