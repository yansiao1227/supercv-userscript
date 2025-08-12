import style from "./styles/global.module.css";

// 当前按钮状态
let checkStatus = false;
// 当前选中元素
let targetElement: Element | null = null;

// 使用html2canvas将元素捕获为图片
const captureElementAsImage = (element: Element) => {
  // @ts-ignore
  if (typeof html2canvas !== "function") {
    alert("html2canvas库加载失败");
    return;
  }

  // @ts-ignore
  html2canvas(element)
    .then((canvas: any) => {
      // 创建一个新的图片标签
      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");
      img.style.maxWidth = "100%";
      img.style.position = "fixed";
      img.style.top = "50%";
      img.style.left = "50%";
      img.style.transform = "translate(-50%, -50%)";
      img.style.zIndex = "10000";
      img.style.backgroundColor = "white";
      img.style.padding = "20px";
      img.id = "captured-image";

      // 创建关闭按钮
      const closeBtn = document.createElement("button");
      closeBtn.innerText = "关闭";
      closeBtn.style.position = "absolute";
      closeBtn.style.top = "5px";
      closeBtn.style.right = "5px";
      closeBtn.style.zIndex = "10001";
      closeBtn.onclick = () => {
        document.body.removeChild(img);
        document.body.removeChild(overlay);
      };

      // 创建背景遮罩
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      overlay.style.zIndex = "9999";
      overlay.onclick = () => {
        document.body.removeChild(img);
        document.body.removeChild(overlay);
      };

      // 添加到文档
      img.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.appendChild(img);

      // 创建下载按钮
      const downloadBtn = document.createElement("button");
      downloadBtn.innerText = "下载图片";
      downloadBtn.style.position = "absolute";
      downloadBtn.style.bottom = "5px";
      downloadBtn.style.right = "5px";
      downloadBtn.style.zIndex = "10001";
      downloadBtn.onclick = () => {
        const link = document.createElement("a");
        link.download = "captured-element.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };
      img.appendChild(downloadBtn);
    })
    .catch((error: any) => {
      console.error("捕获元素失败:", error);
      alert("捕获元素失败: " + error.message);
    });
};

// 简单打印，直接直接替换页面元素，确保样式正确，打印完后刷新页面
const printEasy = (element: Element) => {
  const targetStr = element.innerHTML;
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
const printAdvanced = (element: Element) => {
  // 删除iframe
  const removeIframe = () => {
    const iframeEl = document.querySelector(".target-el-iframe");
    if (iframeEl) {
      iframeEl.remove();
    }
  };
  removeIframe();

  //目标元素
  const info = element;

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

  // 复制主页面的头节点
  // documentEl.head.innerHTML = document.head.innerHTML;

  // 复制所有样式节点
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

  // 设置iframe的主题
  const theme = document.documentElement.getAttribute("data-theme");
  documentEl.documentElement.setAttribute("data-theme", theme || "dark");

  // // 递归复制元素及其父节点结构
  // const root = document.createElement("div");
  // // 递归复制的层数
  // const limitLayer = 2;
  // let layer = 0;
  // const cloneWithParents = (el: Element): Element => {
  //   layer++;
  //   // 复制当前元素（不包含子节点）
  //   const clonedEl = el.cloneNode(false) as Element;
  //   // 如果有父节点且不是body
  //   if (
  //     el.parentElement &&
  //     el.parentElement.tagName.toLowerCase() !== "body" &&
  //     layer < limitLayer
  //   ) {
  //     // 递归复制父节点
  //     const clonedParent = cloneWithParents(el.parentElement);
  //     // 将当前元素添加到父节点
  //     clonedParent.appendChild(clonedEl);
  //   } else {
  //     root.appendChild(clonedEl);
  //   }
  //   return clonedEl;
  // };
  // // 复制目标元素（包含子节点）
  // const clonedInfo = info.cloneNode(true) as Element;
  // // 得到所有父节点
  // const clonedWithParents = cloneWithParents(info);
  // // 将子节点放入父节点中
  // clonedWithParents.appendChild(clonedInfo);
  // // 将完整结构添加到iframe
  // documentEl.body.appendChild(root);

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
  }, 1000);
};

// 存储事件处理函数的引用
const eventHandlers = {
  handlePrintKeyDown: (e: any) => {
    if (e.key === "p") {
      if (targetElement) {
        printAdvanced(targetElement);
      }
    }
  },
  // handleCaptureKeyDown: (e: any) => {
  //   if (e.key === "s") {
  //     if (targetElement) {
  //       captureElementAsImage(targetElement);
  //     }
  //   }
  // },
  overlayMousemove: (e: any) => {
    // 获取当前鼠标下的元素
    targetElement = document.elementFromPoint(e.clientX, e.clientY);
    if (!targetElement) {
      const infoBox = document.getElementById("element-info-box");
      const overlay = document.getElementById("element-overlay");
      if (infoBox) infoBox.style.display = "none";
      if (overlay) overlay.style.display = "none";
      return;
    }

    // 获取元素位置和尺寸
    const rect = targetElement.getBoundingClientRect();

    // 设置遮罩层位置和尺寸
    const overlay = document.getElementById("element-overlay");
    if (overlay) {
      overlay.style.left = `${rect.left}px`;
      overlay.style.top = `${rect.top}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.display = "block";
    }

    // 构建元素信息
    let elementInfo = "按P打印选中元素:\n";
    // elementInfo += "按S保存为图片:\n";
    elementInfo += `标签: ${targetElement.tagName.toLowerCase()}`;
    if (targetElement.id) {
      elementInfo += `\nID: #${targetElement.id}`;
    }
    if (targetElement.className) {
      elementInfo += `\n类名: .${targetElement.className.split(" ").join(".")}`;
    }

    elementInfo += `\n位置: X=${Math.round(rect.left)}, Y=${Math.round(
      rect.top
    )}`;
    elementInfo += `\n尺寸: W=${Math.round(rect.width)}, H=${Math.round(
      rect.height
    )}`;

    // 设置信息框内容
    const infoBox = document.getElementById("element-info-box");
    if (infoBox) {
      infoBox.textContent = elementInfo;

      // 定位信息框（避免超出窗口）
      const padding = 10;
      let left = e.clientX + padding;
      let top = e.clientY + padding;

      // 检查右侧边界
      if (left + infoBox.offsetWidth > window.innerWidth) {
        left = e.clientX - infoBox.offsetWidth - padding;
      }

      // 检查底部边界
      if (top + infoBox.offsetHeight > window.innerHeight) {
        top = e.clientY - infoBox.offsetHeight - padding;
      }

      infoBox.style.left = `${left}px`;
      infoBox.style.top = `${top}px`;
      infoBox.style.display = "block";
    }
  },
  overlayMouseleave: () => {
    const infoBox = document.getElementById("element-info-box");
    const overlay = document.getElementById("element-overlay");
    if (infoBox) infoBox.style.display = "none";
    if (overlay) overlay.style.display = "none";
  },
};

// 清除函数
const cleanupElementInfoViewer = () => {
  // 移除事件监听器
  // document.removeEventListener("keydown", eventHandlers.handleCaptureKeyDown);
  document.removeEventListener("keydown", eventHandlers.handlePrintKeyDown);
  document.removeEventListener("mousemove", eventHandlers.overlayMousemove);
  document.removeEventListener("mouseleave", eventHandlers.overlayMouseleave);

  // 移除元素
  const infoBox = document.getElementById("element-info-box");
  if (infoBox && infoBox.parentNode) {
    infoBox.parentNode.removeChild(infoBox);
  }

  const overlay = document.getElementById("element-overlay");
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
};

// 添加鼠标悬浮显示元素信息的功能
const initElementInfoViewer = () => {
  // 先清理可能存在的元素和事件监听器
  cleanupElementInfoViewer();

  // 创建信息框元素
  const infoBox = document.createElement("div");
  infoBox.id = "element-info-box";
  infoBox.style.position = "fixed";
  infoBox.style.zIndex = "9999";
  infoBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  infoBox.style.color = "white";
  infoBox.style.padding = "8px 12px";
  infoBox.style.borderRadius = "4px";
  infoBox.style.fontFamily = "monospace";
  infoBox.style.fontSize = "12px";
  infoBox.style.maxWidth = "300px";
  infoBox.style.display = "none";
  infoBox.style.pointerEvents = "none";
  document.body.appendChild(infoBox);

  // 创建遮罩层元素
  const overlay = document.createElement("div");
  overlay.id = "element-overlay";
  overlay.style.position = "fixed";
  overlay.style.zIndex = "9998";
  overlay.style.backgroundColor = "rgba(255, 165, 0, 0.2)";
  overlay.style.outline = "2px solid rgba(255, 165, 0, 0.7)";
  overlay.style.pointerEvents = "none";
  overlay.style.display = "none";
  document.body.appendChild(overlay);

  // 绑定或移除监听
  if (checkStatus) {
    // document.addEventListener("keydown", eventHandlers.handleCaptureKeyDown);
    document.addEventListener("keydown", eventHandlers.handlePrintKeyDown);
    document.addEventListener("mousemove", eventHandlers.overlayMousemove);
    document.addEventListener("mouseleave", eventHandlers.overlayMouseleave);
  }
};

const printButton = document.createElement("div");
const printButtonText = document.createElement("span");
printButtonText.style.textAlign = "center";
printButtonText.innerHTML = "observe off";
printButton.appendChild(printButtonText);
printButton.classList.add(style.button);
printButton.addEventListener("click", () => {
  checkStatus = !checkStatus;
  printButtonText.innerHTML = checkStatus ? "observe on" : "observe off";
  initElementInfoViewer();
});
document.body.appendChild(printButton);
