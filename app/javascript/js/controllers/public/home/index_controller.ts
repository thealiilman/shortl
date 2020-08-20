// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from 'stimulus'
import { showAlert } from 'js/utils/alert';

type SuccessfulLinkGenerationResponse = CustomEvent & {
  detail: [
    {
      original_url: string
      shortened_url: string
    }
  ]
}

type UnsuccessfulLinkGenerationResponse = CustomEvent & {
  detail: [
    {
      error: {
        message: string
      }
    }
  ]
}

class UiController {
  static showOriginalAndShortenedLinks = (
    target: HTMLDivElement,
    data: { original_url: string, shortened_url: string },
  ): void => {
    const { original_url, shortened_url } = data
    target.querySelector('#welcomeHeader').classList.add('d-none')
    target.querySelector('form').classList.add('d-none');
    (target.querySelector('form > input[type=text]') as HTMLInputElement).value = ''
    target.querySelector('#successfulGenerationHeader').classList.remove('d-none')

    const shortenedLinkElement = document.createElement('a')
    shortenedLinkElement.textContent = shortened_url
    shortenedLinkElement.href = shortened_url

    const shortenedLinkContainer = target.querySelector('.shortened-link-container')
    shortenedLinkContainer.appendChild(shortenedLinkElement)
    shortenedLinkContainer.classList.remove('d-none')
    shortenedLinkContainer.classList.add('d-flex')

    const originalLinkElement = document.createElement('a')
    originalLinkElement.textContent = original_url
    originalLinkElement.href = original_url

    const originalLinkContainer = target.querySelector('.original-link-container')
    originalLinkContainer.appendChild(originalLinkElement)
    originalLinkContainer.classList.remove('d-none')
    originalLinkContainer.classList.add('d-flex')

    const resetBtn = target.querySelector('.reset-btn')
    resetBtn.classList.remove('d-none')
  }

  static resetUi(target: HTMLDivElement): void {
    target.querySelector('#welcomeHeader').classList.remove('d-none')
    target.querySelector('form').classList.remove('d-none')
    target.querySelector('#successfulGenerationHeader').classList.add('d-none')

    const shortenedLinkContainer = target.querySelector('.shortened-link-container')
    shortenedLinkContainer.classList.remove('d-flex')
    shortenedLinkContainer.classList.add('d-none')
    shortenedLinkContainer.removeChild(shortenedLinkContainer.lastElementChild)

    const originalLinkContainer = target.querySelector('.original-link-container')
    originalLinkContainer.classList.remove('d-flex')
    originalLinkContainer.classList.add('d-none')
    originalLinkContainer.removeChild(originalLinkContainer.lastElementChild)

    const resetBtn = target.querySelector('.reset-btn')
    resetBtn.classList.add('d-none')
  }
}

// Fooling TS compiler. References:
// - https://github.com/stimulusjs/stimulus/issues/221#issuecomment-457275513
// - https://github.com/rails/webpacker/issues/2558
class BaseController extends Controller {
  public generateLinkContainerTarget!: HTMLDivElement;
}

export default class extends (Controller as typeof BaseController) {
  public static targets = ['generateLinkContainer']

  resetUi(): void {
    UiController.resetUi(this.generateLinkContainerTarget)
  }

  onSuccessfulLinkGeneration(data: SuccessfulLinkGenerationResponse): void {
    const { detail: [response] } = data
    UiController.showOriginalAndShortenedLinks(
      this.generateLinkContainerTarget,
      response
    )
  }

  onUnsuccessfulLinkGeneration(data: UnsuccessfulLinkGenerationResponse): void {
    const { detail: [response] } = data
    showAlert(response.error.message, 'error')
  }
}
