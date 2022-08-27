import { Words } from '../../../models/words.interface';
import { Word } from '../../../models/word.interface';
import { SERVER } from '../../../controllers/loader';
import { countGameResults } from '../../../controllers/helpers';

const templateAudiocall: string = `
  <div class="audiocall__wrapper wrapper">
    <div class="game-window"></div>
  </div>
`;

const templateAudiocallWindow: string = `
    <div class="game-window__text-content">
      <h4 class="game-window__heading">Аудиовызов</h4>
      <p class="game-window__text">Прослушайте слово и выберите правильный вариант из пяти предложенных</p>
      <p class="game-window__note">Для управления с клавиатуры используйте клавиши “1”–“5”, “Пробел” — пропустить.</p>
    </div>
    
    <div class="game-window__categories">
      <p class="game-window__text">Выберите категорию:</p>
      <div class="game-window__buttons">
        <button class="game-window__button game-window__button_a1" data-group="0">A1</button>
        <button class="game-window__button game-window__button_a2" data-group="1">A2</button>
        <button class="game-window__button game-window__button_b1" data-group="2">B1</button>
        <button class="game-window__button game-window__button_b2" data-group="3">B2</button>
        <button class="game-window__button game-window__button_c1" data-group="4">C1</button>
        <button class="game-window__button game-window__button_c2" data-group="5">C2</button>
      </div>
    </div>
    
    <div class="game-window__begin">
      <p class="game-window__text">Используются слова со страницы учебника</p>
      <button class="button game-window__buttonBegin">Начать!</button>
    </div>
`;

const templateAudiocallListening = (wordsArray: Words) => `
<div class="audiocall-game">
  <div class="audiocall-game__wrapper wrapper">
  
     <div class="audiocall-game__container">
     <div class="audiocall-game__listening">
        <div class="audiocall-game__listening-button-wrapper">
          <button class="audiocall-game__listening-button button-play-audio">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="45" cy="45" r="45" fill="#FAD243"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M59.9037 71.2001C54.5592 71.2001 51.5021 66.9926 49.8734 61.7905C49.2815 59.877 48.7208 57.8167 46.0197 55.0688C41.0935 50.0514 38.9798 44.3243 38.9798 38.7106C38.9798 29.3478 46.3579 22.2501 54.4613 22.2501C64.0667 22.2501 71.338 30.665 66.5609 43.8081L62.3 42.2751C66.0625 31.5172 60.2997 27.2252 54.3301 27.1117C49.1503 27.0116 44.4778 31.584 43.8392 36.924C43.2829 41.5831 44.5022 47.219 48.9567 51.4933C52.8171 55.1957 53.3422 57.6476 54.0475 60.0751C55.674 65.6732 58.2372 66.5343 60.0661 66.4141C64.3448 66.1315 66.2071 61.6415 62.1665 56.5373L66.2205 54.2567C68.0917 57.0135 68.9594 59.9794 68.975 62.3001C69.0106 67.7513 64.6607 71.2001 59.9037 71.2001ZM32.6096 56.5395L29.5235 60.0751C23.7118 54.9064 20.025 47.3614 20.025 38.9354C20.025 30.5093 23.7118 22.9643 29.5235 17.7979L32.6096 21.3312C27.7658 25.6388 24.6886 31.9266 24.6886 38.9354C24.6886 45.9441 27.7658 52.2297 32.6096 56.5395ZM33.5886 38.9354C33.5886 34.7279 35.4331 30.9565 38.339 28.3711L35.2551 24.8444C31.3792 28.2887 28.925 33.3172 28.925 38.9354C28.925 44.5535 31.3792 49.582 35.2551 53.0263L38.339 49.4997C35.4331 46.9142 33.5886 43.1406 33.5886 38.9354ZM59.2562 51.5333C56.4972 52.9907 54.0008 50.8903 52.8927 48.3204C51.8336 45.8707 52.4766 43.065 54.5993 40.8133C56.0611 39.2624 56.8732 37.4068 56.5662 35.9917C56.4527 35.4532 56.1301 34.7346 55.2668 34.3808C54.4013 34.0226 53.5046 34.1338 52.7815 34.5365C51.62 35.1818 50.6966 36.7504 50.3785 38.6283L47.0877 38.0721C47.5816 35.1707 49.1035 32.7588 51.1617 31.6196C52.7882 30.7184 54.7239 30.5471 56.535 31.2925C58.2349 31.9911 59.4342 33.4485 59.8325 35.2908C60.3754 37.8162 59.274 40.7198 57.0245 43.105C61.608 44.2487 62.1687 49.7578 59.2562 51.5333Z" fill="#482800"/>
            </svg>
          </button>
        </div>
        <div class="audiocall-game__image">
          <img class="audiocall-game__dog" src="./assets/images/game-audiocall/audiocall-dog.svg" alt="Audiocall dog">
        </div>
     </div>
     </div>
     
     <div class="audiocall-game__content audiocall-content">
      <div class="audiocall-content__items">
        <div class="audiocall-content__item" data-id="${wordsArray[0].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">1. ${wordsArray[0].wordTranslate}</span>
        </div>
        <div class="audiocall-content__item" data-id="${wordsArray[1].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">2. ${wordsArray[1].wordTranslate}</span>
        </div>
        <div class="audiocall-content__item" data-id="${wordsArray[2].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">3. ${wordsArray[2].wordTranslate}</span>
        </div>
        <div class="audiocall-content__item" data-id="${wordsArray[3].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">4. ${wordsArray[3].wordTranslate}</span>
        </div>
        <div class="audiocall-content__item" data-id="${wordsArray[4].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">5. ${wordsArray[4].wordTranslate}</span>
        </div>
      </div>
      <button class="button audiocall-content__button button-dont-know" data-id="button-dont-know">Не знаю</button>
     </div>
  
  </div>
</div>`;

const templateResults = (word: Word) => `
     <div class="audiocall-game__results audiocall-results">
      <div class="audiocall-results__content">
        <span class="audiocall-results__name">${word.word}</span>
        <span class="audiocall-results__translation">${word.wordTranslate}</span>
        <div class="audiocall-results__listening">
          <button class="audiocall-results__button button-play-audio">
            <svg width="40" height="40" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="45" cy="45" r="45" fill="#FAD243"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M59.9037 71.2001C54.5592 71.2001 51.5021 66.9926 49.8734 61.7905C49.2815 59.877 48.7208 57.8167 46.0197 55.0688C41.0935 50.0514 38.9798 44.3243 38.9798 38.7106C38.9798 29.3478 46.3579 22.2501 54.4613 22.2501C64.0667 22.2501 71.338 30.665 66.5609 43.8081L62.3 42.2751C66.0625 31.5172 60.2997 27.2252 54.3301 27.1117C49.1503 27.0116 44.4778 31.584 43.8392 36.924C43.2829 41.5831 44.5022 47.219 48.9567 51.4933C52.8171 55.1957 53.3422 57.6476 54.0475 60.0751C55.674 65.6732 58.2372 66.5343 60.0661 66.4141C64.3448 66.1315 66.2071 61.6415 62.1665 56.5373L66.2205 54.2567C68.0917 57.0135 68.9594 59.9794 68.975 62.3001C69.0106 67.7513 64.6607 71.2001 59.9037 71.2001ZM32.6096 56.5395L29.5235 60.0751C23.7118 54.9064 20.025 47.3614 20.025 38.9354C20.025 30.5093 23.7118 22.9643 29.5235 17.7979L32.6096 21.3312C27.7658 25.6388 24.6886 31.9266 24.6886 38.9354C24.6886 45.9441 27.7658 52.2297 32.6096 56.5395ZM33.5886 38.9354C33.5886 34.7279 35.4331 30.9565 38.339 28.3711L35.2551 24.8444C31.3792 28.2887 28.925 33.3172 28.925 38.9354C28.925 44.5535 31.3792 49.582 35.2551 53.0263L38.339 49.4997C35.4331 46.9142 33.5886 43.1406 33.5886 38.9354ZM59.2562 51.5333C56.4972 52.9907 54.0008 50.8903 52.8927 48.3204C51.8336 45.8707 52.4766 43.065 54.5993 40.8133C56.0611 39.2624 56.8732 37.4068 56.5662 35.9917C56.4527 35.4532 56.1301 34.7346 55.2668 34.3808C54.4013 34.0226 53.5046 34.1338 52.7815 34.5365C51.62 35.1818 50.6966 36.7504 50.3785 38.6283L47.0877 38.0721C47.5816 35.1707 49.1035 32.7588 51.1617 31.6196C52.7882 30.7184 54.7239 30.5471 56.535 31.2925C58.2349 31.9911 59.4342 33.4485 59.8325 35.2908C60.3754 37.8162 59.274 40.7198 57.0245 43.105C61.608 44.2487 62.1687 49.7578 59.2562 51.5333Z" fill="#482800"/>
            </svg>
          </button>
          <span class="audiocall-results__transcription">${word.transcription}</span>
        </div>
      </div>
      <div class="audiocall-results__picture">
      <img class="audiocall-results__image" src="${SERVER + word.image}" alt="${word.word} image">
      </div>
    </div>`;

const templateStatisticWord = (word: Word) => `
  <div class="statistic-item">
  <audio src="${SERVER + word.audio}"></audio>
    <button class="statistic-item__button">
       <svg width="24" height="24" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="45" cy="45" r="45" fill="#FAD243"/>
         <path fill-rule="evenodd" clip-rule="evenodd" d="M59.9037 71.2001C54.5592 71.2001 51.5021 66.9926 49.8734 61.7905C49.2815 59.877 48.7208 57.8167 46.0197 55.0688C41.0935 50.0514 38.9798 44.3243 38.9798 38.7106C38.9798 29.3478 46.3579 22.2501 54.4613 22.2501C64.0667 22.2501 71.338 30.665 66.5609 43.8081L62.3 42.2751C66.0625 31.5172 60.2997 27.2252 54.3301 27.1117C49.1503 27.0116 44.4778 31.584 43.8392 36.924C43.2829 41.5831 44.5022 47.219 48.9567 51.4933C52.8171 55.1957 53.3422 57.6476 54.0475 60.0751C55.674 65.6732 58.2372 66.5343 60.0661 66.4141C64.3448 66.1315 66.2071 61.6415 62.1665 56.5373L66.2205 54.2567C68.0917 57.0135 68.9594 59.9794 68.975 62.3001C69.0106 67.7513 64.6607 71.2001 59.9037 71.2001ZM32.6096 56.5395L29.5235 60.0751C23.7118 54.9064 20.025 47.3614 20.025 38.9354C20.025 30.5093 23.7118 22.9643 29.5235 17.7979L32.6096 21.3312C27.7658 25.6388 24.6886 31.9266 24.6886 38.9354C24.6886 45.9441 27.7658 52.2297 32.6096 56.5395ZM33.5886 38.9354C33.5886 34.7279 35.4331 30.9565 38.339 28.3711L35.2551 24.8444C31.3792 28.2887 28.925 33.3172 28.925 38.9354C28.925 44.5535 31.3792 49.582 35.2551 53.0263L38.339 49.4997C35.4331 46.9142 33.5886 43.1406 33.5886 38.9354ZM59.2562 51.5333C56.4972 52.9907 54.0008 50.8903 52.8927 48.3204C51.8336 45.8707 52.4766 43.065 54.5993 40.8133C56.0611 39.2624 56.8732 37.4068 56.5662 35.9917C56.4527 35.4532 56.1301 34.7346 55.2668 34.3808C54.4013 34.0226 53.5046 34.1338 52.7815 34.5365C51.62 35.1818 50.6966 36.7504 50.3785 38.6283L47.0877 38.0721C47.5816 35.1707 49.1035 32.7588 51.1617 31.6196C52.7882 30.7184 54.7239 30.5471 56.535 31.2925C58.2349 31.9911 59.4342 33.4485 59.8325 35.2908C60.3754 37.8162 59.274 40.7198 57.0245 43.105C61.608 44.2487 62.1687 49.7578 59.2562 51.5333Z" fill="#482800"/>
       </svg>
    </button>
    <span class="statistic-item__text"><span class="statistic-item__name">${word.word}</span> - ${word.wordTranslate}</span>
  </div>
`;

const templateGameResults = (rightWords: Words, wrongWords: Words) => `
  <div class="game-results">
    <span class="game-results__heading">Правильных ответов:  ${rightWords.length} из ${rightWords.length + wrongWords.length}</span>
    
    <div class="game-results__wrapper">
      <div class="game-results__mark">
        <span class="game-results__text">
          ${countGameResults(rightWords, wrongWords)}
        </span>
      </div>
      <div class="game-results__statistic">
        <div class="statistic statistic__wrong">
          <span class="statistic__heading">Ошибки:</span>
          <div class="statistic__items">
            ${wrongWords.map((word: Word) => templateStatisticWord(word)).join('')}
          </div>
        </div>
  
        <div class="statistic statistic__right">
          <span class="statistic__heading">Правильные ответы:</span>
          <div class="statistic__items">
            ${rightWords.map((word: Word) => templateStatisticWord(word)).join('')}
          </div>
        </div>
      </div>
    </div>

  </div>
  
`;

export { templateAudiocall, templateAudiocallWindow, templateAudiocallListening, templateResults, templateGameResults };