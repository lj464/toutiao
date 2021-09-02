<template>
  <div class="uupdate">
    <img class="img" ref="image" :src="img" />
    <div class="box">
      <div class="no" @click="$emit('close')">取消</div>
      <div class="ok">确认</div>
    </div>
  </div>
</template>

<script>
// import "cropper/dist/cropper";
// import Cropper from "cropper.js";
export default {
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
//   mounted() {
//     var image = this.$refs.image;
//     new Cropper(image, {
//       aspectRatio: 16 / 9,
//       crop: function (event) {
//         console.log(event.detail.x);
//         console.log(event.detail.y);
//         console.log(event.detail.width);
//         console.log(event.detail.height);
//         console.log(event.detail.rotate);
//         console.log(event.detail.scaleX);
//         console.log(event.detail.scaleY);
//       },
//     });
//   },
};
</script>

<style scoped lang="less">
.uupdate {
  background-color: #000;
  height: 100%;
}
.img {
  max-width: 100%;
  display: block;
}
.box {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  .no,
  .ok {
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
}
</style>
