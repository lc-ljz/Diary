<template>
  <div class="editor-container">
    <!-- 标题 & 时间选择框 -->
    <div class="input-container">
      <div class="input-item">
        <label>标题:</label>
        <input v-model="diaryTitle" type="text" placeholder="请输入标题" />
      </div>
      <div class="input-item">
        <label>时间:</label>
        <input v-model="selectedDateTime" type="datetime-local" />
      </div>
    </div>

    <!-- 富文本编辑器 -->
    <div class="editor-box">
      <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" />
      <Editor
        class="editor"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
      />
    </div>

    <!-- 保存按钮 -->
    <button class="save-button" @click="saveText" :disabled="loading">
      {{ loading ? "保存中..." : "保存" }}
    </button>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import { ref, shallowRef, onBeforeUnmount } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { insertArticle } from "@/api/article";
import { ElMessage } from "element-plus";

const diaryTitle = ref("");
const valueHtml = ref("");
const selectedDateTime = ref(new Date().toISOString().slice(0, 16));
const editorRef = shallowRef();
const loading = ref(false);

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

const handleCreated = (editor) => {
  editorRef.value = editor;
};

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) editor.destroy();
});

// 保存文章
const saveText = async () => {
  if (!diaryTitle.value.trim()) {
    ElMessage.error("标题不能为空");
    return;
  }
  if (!valueHtml.value.trim()) {
    ElMessage.error("内容不能为空");
    return;
  }

  loading.value = true;

  try {
    await insertArticle({
      title: diaryTitle.value,
      content: valueHtml.value,
      date: selectedDateTime.value,
    });

    ElMessage.success("保存成功！");
    diaryTitle.value = "";
    valueHtml.value = "";
    selectedDateTime.value = new Date().toISOString().slice(0, 16);
  } catch (error) {
    ElMessage.error("保存失败，请重试");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

/* 输入框区域固定高度 */
.input-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
  margin-bottom: 15px;
}

.input-item {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}

.input-item label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-item input {
  width: 96%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 富文本编辑器占满剩余空间 */
.editor-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden; /* 关键：内部滚动 */
  min-height: 300px;
}

.toolbar {
  border-bottom: 1px solid #ccc;
  flex-shrink: 0;
}

.editor {
  flex: 1;
  overflow-y: auto; /* 内部滚动 */
  padding: 10px;
}

/* 保存按钮固定在底部 */
.save-button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.save-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.save-button:hover:not(:disabled) {
  background-color: #66b1ff;
}

/* 小屏幕适配 */
@media (max-width: 768px) {
  .input-container {
    flex-direction: column;
    gap: 15px;
  }

  .input-item input {
    width: 100%;
  }
}
</style>
