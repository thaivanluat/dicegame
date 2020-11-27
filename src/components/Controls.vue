<template>
    <div class="wrapper-control">
        <button 
            v-on:click="newGame"
            class="control btn-new"><i class="ion-ios-plus-outline"></i>New game</button>
        <button 
            v-on:click="rollDices"
            class="control btn-roll"><i class="ion-ios-loop"></i>Roll dice</button>
        <button 
            v-on:click="holdScore"
            class="control btn-hold"><i class="ion-ios-download-outline"></i>Hold</button>
        
        <input 
            v-bind:value="finalScore"
            v-bind:disabled="isPlaying"
            v-on:input="setFinalScore"
            type="number" placeholder="Final score" class="final-score">

        <div class="control-lang">
            <a class="flag">
                <img src="/public/assets/vietnam.png" alt="">
            </a>
            <a class="flag">
                <img src="/public/assets/united-states.png" alt="">
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Controls',
    props: {
        finalScore : {
            type: [ String,Number ],
            default: 100
        },
        isPlaying : {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {

        }
    },
    methods: {
        newGame() {
            // console.log("Control vue");
            this.$emit('handleNewGame');
        },

        rollDices() {
            this.$emit('handleRollDices');
        },
        holdScore() {
            this.$emit('handleHoldScore');
        },
        setFinalScore(e) {
            this.$emit('handleChangeFinalScore', e);
        }
    }
}
</script>

<style>
    .control {
        position: absolute;
        width: 200px;
        left: 50%;
        transform: translateX(-50%);
        color: #555;
        background: none;
        border: none;
        font-family: Lato;
        font-size: 20px;
        text-transform: uppercase;
        cursor: pointer;
        font-weight: 300;
        transition: background-color 0.3s, color 0.3s;
    }
    .control.disable {
        pointer-events: none;
    }

    .control:hover { font-weight: 600; }
    .control:hover i { margin-right: 20px; }

    .control:focus {
        outline: none;
    }

    .control i {
        color: #477ced;
        display: inline-block;
        margin-right: 15px;
        font-size: 32px;
        line-height: 1;
        vertical-align: text-top;
        margin-top: -4px;
        transition: margin 0.3s;
    }

    .control-lang {
        position: absolute;
        left: 25%;
    }
    
    a.flag img{
        max-width: 5%;
        float: right;
        margin: 8px;
        border-radius: 50%;
        padding: 5px;
    }

    a.flag.active img{
        border: 2px solid black; 
    }

    a.flag img:hover{
        border: 2px solid black; 
        cursor: pointer;
    }

    .btn-new { top: 50px;}
    .btn-roll { top: 403px;}
    .btn-hold { top: 467px;}

    .final-score {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 520px;
        color: #555;
        font-size: 18px;
        font-family: 'Lato';
        text-align: center;
        padding: 10px;
        width: 160px;
        text-transform: uppercase;
    }

    .final-score:focus { outline: none; }
</style>