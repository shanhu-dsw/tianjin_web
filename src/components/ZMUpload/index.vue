<template>
  <div class="component-upload-image">
    <el-upload
      action="#"
      :auto-upload="false"
      :file-list="uploadList2"
      :on-change="onChangeUpload"
      :on-remove="handlerRemoveImage"
      :before-remove="handlerBeforeRemove"
      :on-exceed="onUpdateExceed"
      drag
      multiple
      :limit="limit"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div
      class="el-upload__tip"
      slot="tip"
    >
      请上传
      <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
      <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
      的文件
    </div>
  </div>
</template>


 <!-- this.$emit('update:file', file) -->
<script>
import { read } from "fs";

export default {
  props: {
    uploadList: [String, Object, Array],
    // 图片数量限制
    limit: {
      type: Number,
      default: 5,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5,
    },
    fileType: {
      type: Array,
      default: () => [
        "png",
        "jpg",
        "jpeg",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "pdf",
        "zip",
      ],
    },
  },
  computed: {},
  data() {
    return {
      uploadList2: [],
    };
  },
  methods: {
    onChangeUpload(file, fileList) {
      console.log(file);
      let flag = this.validateFile(file);
      if (!flag) {
        this.uploadList2 = this.uploadList2.filter((p) => p.uid !== file.uid);
        return false;
      }
      const self = this;
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        file.content = reader.result;
        file.suffix = file.name
          .substring(file.name.lastIndexOf(".") + 1)
          .toUpperCase();
        self.uploadList2.push(file);
        self.$emit("update:uploadList", self.uploadList2);
      };
    },

    async handlerRemoveImage(file, fileList) {
      this.uploadList2 = this.uploadList2.filter((p) => p.uid !== file.uid);
      this.$emit("update:uploadList", this.uploadList2);
    },

    handlerBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    onUpdateExceed() {
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },

    validateFile(file) {
      let isCheck = false;

      let fileExtension = "";
      if (file.name.lastIndexOf(".") > -1) {
        fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
      }

      isCheck = this.fileType.some((type) => {
        if (fileExtension && fileExtension.indexOf(type) > -1) return true;
        return false;
      });

      if (!isCheck) {
        this.$modal.msgError(
          `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
        );
        return false;
      }
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.component-upload-image {
  ::v-deep .el-upload-dragger {
    width: 300px;
    height: 120px;
  }

  ::v-deep .el-upload-dragger .el-icon-upload {
    font-size: 50px;
    color: #c0c4cc;
    margin: 10px 0 10px 0;
  }
}
</style>