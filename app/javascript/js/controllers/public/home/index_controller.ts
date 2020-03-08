// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from 'stimulus'
import { showAlert } from 'js/utils/alert'

interface SuccessfulLinkGenerationResponse extends CustomEvent {
  detail: [
    {
      original_url: string
      shortened_url: string
    }
  ]
}

interface UnsuccessfulLinkGenerationResponse extends CustomEvent {
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
    target.querySelector('form').classList.add('d-none')
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
  }
}

export default class extends Controller {
  static targets = ['generateLinkContainer']
  generateLinkContainerTarget: HTMLDivElement

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
