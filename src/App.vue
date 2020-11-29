<template>
  <div id="app">
      <div class="wrapper clearfix">
          <Players
            v-bind:scoresPlayer="scoresPlayer"
            v-bind:activePlayer="activePlayer"
            v-bind:currentScore="currentScore"
            v-bind:isWinner="isWinner"
          />

          <Controls
            v-bind:isPlaying="isPlaying"
            v-bind:finalScore="finalScore"
            v-on:handleNewGame="handleNewGame"
            v-on:handleRollDices="handleRollDices"
            v-on:handleHoldScore="handleHoldScore"
            v-on:handleChangeFinalScore="handleChangeFinalScore"
          />

          <Dices
            v-bind:dices="dices"/>

          <RuleModal 
            v-on:handleConfirm="handleConfirm"
            v-bind:isOpenPopup="isOpenPopup" />
      </div>
  </div>
</template>

<script>
import Players from './components/Players';
import Controls from './components/Controls';
import Dices from './components/Dices';
import RuleModal from './components/RuleModal';

export default {
  name: 'app',
  data () {
    return {
      isPlaying: false,
      isOpenPopup: false,
      activePlayer: 0,
      scoresPlayer: [0, 0],
      dices: [1, 1],
      currentScore: 0,
      finalScore: 50
    }
  },

  computed: {
    isWinner() {
      let { scoresPlayer, finalScore } = this;

      if((scoresPlayer[0] >= finalScore || scoresPlayer[1] >= finalScore) && finalScore) {
        this.isPlaying = false;

        return true;
      }

      return false;
    }
  },

  components: {
    Players,
    Controls,
    Dices,
    RuleModal
  },
  methods: {
    handleNewGame() {
      // console.log("App vue");
      this.isOpenPopup = true;
    },

    handleConfirm() {
      this.isPlaying = true,
      this.isOpenPopup = false,
      this.activePlayer = 0,
      this.scoresPlayer = [0, 0],
      this.dices = [1, 1],
      this.currentScore = 0
    },
    handleRollDices() {
      if(this.isPlaying) {
        let dice1 = Math.ceil(Math.random()*6);
        let dice2 = Math.ceil(Math.random()*6);

        this.dices = [dice1, dice2];

        if(dice1 == 1 || dice2 == 1) {
          let activePlayer = this.activePlayer;
          setTimeout(() => {
            alert(this.$t('stop_message', {player: activePlayer+1}));
            // alert(`Nguoi choi Player ${activePlayer + 1} da quay trung so 1. Rat tiec`);
          }, 10);
          this.switchPlayer();
        }
        else {
          this.currentScore += dice1 + dice2;
        }
      }
      else {
        alert(this.$t('please_choose_new_game'));
      }
    },

    handleHoldScore() {
      if(this.isPlaying) {
        let { scoresPlayer, activePlayer, currentScore } = this;

        let newScore = scoresPlayer[activePlayer] + currentScore;

        this.$set(scoresPlayer, activePlayer, newScore);

        if(!this.isWinner) {
          this.switchPlayer();
        }
      }
      else {
        alert('Vui long chon new game');
      }
    },

    handleChangeFinalScore(e) {
      let number = parseInt(e.target.value);
      if(isNaN(number)) {
        this.finalScore = '';
      }
      else {
        this.finalScore = number;
      }
    },

    switchPlayer() {
      this.activePlayer = this.activePlayer === 0 ? 1:0;
      this.currentScore = 0;
    },
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

body {
    background-image: linear-gradient(rgba(62, 20, 20, 0.4), rgba(62, 20, 20, 0.4)), url('/public/assets/back.jpg');
    background-size: cover;
    background-position: center;
    font-family: Lato;
    font-weight: 300;
    position: relative;
    height: 100vh;
    color: #555;
}

.wrapper {
    width: 1000px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}
</style>
