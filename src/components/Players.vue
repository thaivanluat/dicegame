<template>
  <div class="wrapper-player">
      <div class="player-panel" 
            v-bind:class="{ 
                active: activePlayer == 0 && !isWinner,
                winner: activePlayer == 0 && isWinner
            }">
            <div class="player-name">{{ getNamePlayer(0) }}</div>
            <div class="player-score">{{ scoresPlayer[0] }}</div>
            <div class="player-current-box">
                <div class="player-current-label">{{ $t('current') }}</div>
                <div class="player-current-score">{{ activePlayer == 0 ? currentScore : 0 }}</div>
            </div>
        </div>
        
        <div class="player-panel" 
            v-bind:class="{ 
                active: activePlayer == 1 && !isWinner,
                winner: activePlayer == 1 && isWinner
            }">
            <div class="player-name">{{ getNamePlayer(1) }}</div>
            <div class="player-score">{{ scoresPlayer[1] }}</div>
            <div class="player-current-box">
                <div class="player-current-label">{{ $t('current') }}</div>
                <div class="player-current-score">{{ activePlayer == 1 ? currentScore : 0 }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Players',
    props: {
        scoresPlayer: {
            type: Array,
            default: [0,0]
        },
        currentScore: {
            type: Number,
            default: 0
        },
        activePlayer: {
            type: Number,
            default: 0
        },
        isWinner: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        getNamePlayer(index) {
            let defaultName = this.$t('player') + " " + (index+1);


            if(this.activePlayer == index && this.isWinner) {
                defaultName = this.$t('winner');
            }

            return defaultName;
        }
    },
}
</script>

<style>
    .player-panel {
        width: 50%;
        float: left;
        height: 600px;
        padding: 100px;
        transition: all .3s ease;
        background-color: #fff;
    }
    .player-name {
        font-size: 40px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 300;
        margin-top: 20px;
        margin-bottom: 10px;
        position: relative;
        font-family: monospace;
    }

    .player-score {
        text-align: center;
        font-size: 80px;
        font-weight: 100;
        color: #477ced;
        margin-bottom: 130px;
    }

    .active { background-color: #dae2f3; }
    .active .player-name { font-weight: 800; }

    .active .player-name::after {
        content: "\2022";
        font-size: 47px;
        position: absolute;
        color: #477ced;
        top: -7px;
        right: -20px;
    }

    .player-current-box {
        background-color: #477ced;
        color: #fff;
        width: 40%;
        margin: 0 auto;
        padding: 12px;
        text-align: center;
    }

    .player-current-label {
        text-transform: uppercase;
        margin-bottom: 10px;
        font-size: 12px;
        color: #fff;
        font-family: sans-serif;
    }

    .player-current-score {
        font-size: 30px;
    }

    .winner { background-color: #bbe7ff; }
    .winner .player-name { font-weight: 800; color: #ff0000; }
</style>