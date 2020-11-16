import React from "react";
import { useLocalStore } from "mobx-react";
import { ThemeConsumer } from "styled-components";

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    user: {
      isLogged: false,
    },
    deck: [],
    game: {
      won: false,
      option: 0,
      foundPair: 0,
      flippedCards: [],
      validFlipCount: 0,
      totalFlipCount: 0,
    },
    setLogin(boolean) {
      this.user.isLogged = boolean;
    },
    setOption(option) {
      this.game.option = option;
    },
    setWinner(boolean) {
      this.game.won = boolean;
    },
    incrementFoundPair() {
      this.game.foundPair = this.game.foundPair + 1;
    },
    cardPush(card) {
      this.deck.push(card);
    },
    shuffleDeck() {
      this.deck = this.deck.sort(() => Math.random() - 0.5);
    },
    flushDeck() {
      this.game.foundPair = 0;
      this.deck.length = 0;
    },
    showDeck() {
      console.log([...this.deck]);
    },
    updateDeck(id) {
      this.deck = this.deck.map((card) => {
        if (card.id === id) {
          card.flipped = true;
        }
        return card;
      });
    },
    resetDeck() {
      this.deck = this.deck.map((card) => {
        if (!card.disabled) {
          card.flipped = false;
        }
        return card;
      });
    },
    incrementValidFlipCount() {
      this.game.validFlipCount = this.game.validFlipCount + 1;
    },
    incrementTotalFlipCount() {
      this.game.totalFlipCount = this.game.totalFlipCount + 1;
    },
    addFlippedCards(card) {
      this.game.flippedCards.push(card);
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => React.useContext(StoreContext);
