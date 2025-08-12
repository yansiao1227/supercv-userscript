import style from "./styles/global.module.css";

// 简单打印，直接直接替换页面元素，确保样式正确，打印完后刷新页面
const printEasy = (elementId: string) => {
  const targetStr = document.getElementById(elementId)?.innerHTML || "";
  window.document.body.innerHTML = targetStr;
  const style = document.createElement("style");
  style.media = "print";
  style.innerText = `
	 @page {
	  size: auto;
	  margin: 0mm;
	}`;
  window.document.head.append(style);
  window.print();
  // 刷新页面
  window.location.reload();
};

// 打印指定元素，进阶版
const printAdvanced = (elementId: string) => {
  // 删除iframe
  const removeIframe = () => {
    const iframeEl = document.querySelector(".target-el-iframe");
    if (iframeEl) {
      iframeEl.remove();
    }
  };
  removeIframe();

  //目标元素
  const info = document.getElementById(elementId);
  if (!info) {
    const msg = `未找到id为${elementId}的元素，请确保页面加载完成后再试`;
    alert(msg);
    return;
  }

  //创建iframe
  const iframeEl = document.createElement("iframe");
  iframeEl.className = "target-el-iframe";
  //将元素放置最底层，防止其覆盖了其他元素
  iframeEl.style.position = "fixed";
  iframeEl.style.zIndex = "-99";
  document.body.append(iframeEl);

  const documentEl = iframeEl.contentDocument;
  if (!documentEl) {
    const msg = "打印失败，未找到iframe的contentDocument对象";
    alert(msg);
    return;
  }

  // 复制主页面的所有样式到iframe
  const styleNodes = document.head.querySelectorAll(
    'link[rel="stylesheet"], style'
  );
  styleNodes.forEach((node) => {
    // 克隆节点
    const clonedNode = node.cloneNode(true) as HTMLElement;
    // 对于link标签，确保添加crossorigin属性
    if (clonedNode.tagName.toLowerCase() === "link") {
      clonedNode.setAttribute("crossorigin", "anonymous");
    }
    // 添加到iframe的head
    documentEl.head.appendChild(clonedNode);
  });

  //深度拷贝目标元素
  documentEl.body.append(info.cloneNode(true));

  //去除打印的页眉和页脚
  const style = document.createElement("style");
  style.media = "print";
  style.innerText = `
	 @page {
	  size: auto;
	  margin: 0mm;
	}`;
  documentEl.head.append(style);

  // 等待样式加载完毕
  setTimeout(() => {
    //打印
    if (!iframeEl.contentWindow) {
      const msg = "未找到iframe的contentWindow对象";
      alert(msg);
      return;
    }
    iframeEl.contentWindow.print();
    printButtonText.innerHTML = "print";
  }, 1000);
};

const buttonContainer = document.createElement("div");
buttonContainer.classList.add(style.container);

const printButton = document.createElement("div");
const printButtonText = document.createElement("span");
printButtonText.style.textAlign = "center";
printButtonText.innerHTML = "print";
printButton.appendChild(printButtonText);
printButton.classList.add(style.button);
printButton.addEventListener("click", () => {
  printButtonText.innerHTML = "load";
  printAdvanced("cv-container");
});

buttonContainer.appendChild(printButton);
document.body.appendChild(buttonContainer);
