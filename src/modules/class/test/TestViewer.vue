<template>
  <v-sheet class="pa-4">
    <div class="question" v-for="i in 10" :key="i">
            <p class="font-weight-regular">{{i}}. Các thành phần chính trong GameMaker Studio là:</p>
            <p class="font-weight-regular pl-10"><div class="answer"><span>A</span></div>Hình ảnh, âm thanh, vật thể, mã điều khiển, hình nền và màn chơi</p>
            <p class="font-weight-regular pl-10"><div class="answer true"><span>B</span></div>hình nền và màn chơi</p>
            <p class="font-weight-regular pl-10"><div class="answer"><span>C</span></div>Hình ảnh,  hình nền và màn chơi</p>
            <p class="font-weight-regular pl-10"><div class="answer"><span>D</span></div>Mã điều khiển, hình nền và màn chơi</p>
    </div>
  </v-sheet>
</template>

<script>
export default {}
</script>

<style scoped>
.answer {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 0 1px #dddbda;
  min-width: 24px;
  min-height: 24px;
  margin: 0 10px;
}

.false {
  color: white;
  background-color: firebrick;
}
.true {
  color: white;
  background-color: forestgreen;
}
.question {
  border-bottom: solid 1px darkgray;
  padding: 10px;
}
</style>
