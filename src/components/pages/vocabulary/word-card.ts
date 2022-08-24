import { Word } from '../../../models/word.interface';
import { mapOfWords } from './vocabulary';
import renderElement from '../../../controllers/helpers';
import { SERVER } from '../../../controllers/loader';
import { wordDisplayBox } from './templates';

const playAudio = (audio: HTMLAudioElement) => {
  audio?.play();
};

const enableAudio = (word: Word) => {
  const buttonListen: HTMLButtonElement = document.querySelector('.btn-listen');

  buttonListen.addEventListener('click', () => {
    const audioWord: HTMLAudioElement = new Audio(`${SERVER + word.audio}`);
    const audioMeaning: HTMLAudioElement = new Audio(`${SERVER + word.audioMeaning}`);
    const audioExample: HTMLAudioElement = new Audio(`${SERVER + word.audioExample}`);

    const arrayOfAudio: HTMLAudioElement[] = [audioWord, audioMeaning, audioExample];

    playAudio(arrayOfAudio[0]);

    arrayOfAudio.forEach((audio: HTMLAudioElement, index: number) => {
      audio.addEventListener('ended', () => {
        playAudio(arrayOfAudio[index + 1]);
      });
    });
  });
};

const selectWordCard = () => {
  const wordId: string = localStorage.getItem('id') || Object.keys(mapOfWords)[0];
  const eventTargetClosest: HTMLElement = document.querySelector(`[data-word="${wordId}"]`);

  const wordActive: HTMLElement = document.querySelector('.word-list__card.active');
  const wordDisplay: HTMLElement = document.querySelector('.word-display');

  wordActive?.classList?.remove('active');
  wordDisplay.innerHTML = '';
  eventTargetClosest.classList.add('active');

  renderElement('div', wordDisplayBox(mapOfWords[wordId]), wordDisplay, 'word-display__box');
  enableAudio(mapOfWords[wordId]);

  const buttonCardSwitchLeft: HTMLElement = document.querySelector('.word-display__btn.left');
  const buttonCardSwitchRight: HTMLElement = document.querySelector('.word-display__btn.right');

  buttonCardSwitchLeft.classList.toggle('disabled', !eventTargetClosest.previousElementSibling);
  buttonCardSwitchRight.classList.toggle('disabled', !eventTargetClosest.nextElementSibling);
};

const addCardSwitches: () => void = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.word-display__btn');
    const wordActive: HTMLElement = document.querySelector('.word-list__card.active');
    let siblingWordId: string;

    if (!eventTargetClosest) {
      return;
    }

    if (eventTargetClosest.classList.contains('left')) {
      siblingWordId = (wordActive.previousElementSibling as HTMLElement)?.dataset?.word;
    } else {
      siblingWordId = (wordActive.nextElementSibling as HTMLElement)?.dataset?.word;
    }

    if (!siblingWordId) {
      return;
    }

    localStorage.setItem('id', siblingWordId);
    selectWordCard();
  });
};

const initWordCard: () => void = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.word-list__card');

    if (!eventTargetClosest) {
      return;
    }
    localStorage.setItem('id', eventTargetClosest?.dataset?.word);

    selectWordCard();
  });

  addCardSwitches();
};

export { initWordCard, selectWordCard };
