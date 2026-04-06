// 全局JavaScript

// 页面导航
function navigateTo(page) {
  window.location.href = page + '.html';
}

// 显示提示框
function showToast(title, duration = 2000, icon = 'none') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    text-align: center;
  `;
  toast.textContent = title;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, duration);
}

// 显示加载框
function showLoading(title = '加载中...') {
  const loading = document.createElement('div');
  loading.id = 'loading';
  loading.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;
  loading.innerHTML = `
    <div style="width: 50px; height: 50px; border: 3px solid #fff; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    <div style="color: #fff; margin-top: 16px; font-size: 14px;">${title}</div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  document.body.appendChild(loading);
}

// 隐藏加载框
function hideLoading() {
  const loading = document.getElementById('loading');
  if (loading) {
    document.body.removeChild(loading);
  }
}

// 显示确认对话框
function showModal(title, content, confirmText = '确定', cancelText = '取消', successCallback = null, cancelCallback = null) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;
  modal.innerHTML = `
    <div style="background-color: #fff; border-radius: 12px; width: 80%; max-width: 300px; overflow: hidden;">
      <div style="padding: 24px; text-align: center;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">${title}</h3>
        <p style="font-size: 14px; color: #666; line-height: 1.5;">${content}</p>
      </div>
      <div style="display: flex; border-top: 1px solid #f0f0f0;">
        <button id="cancelBtn" style="flex: 1; padding: 16px; border: none; background: none; font-size: 14px; color: #666; border-right: 1px solid #f0f0f0;">${cancelText}</button>
        <button id="confirmBtn" style="flex: 1; padding: 16px; border: none; background: none; font-size: 14px; color: #3b82f6;">${confirmText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  document.getElementById('cancelBtn').addEventListener('click', () => {
    document.body.removeChild(modal);
    if (cancelCallback) {
      cancelCallback();
    }
  });
  
  document.getElementById('confirmBtn').addEventListener('click', () => {
    document.body.removeChild(modal);
    if (successCallback) {
      successCallback();
    }
  });
}

// 自动计算金额
function calculateAmount(weightId, priceId, amountId) {
  const weight = document.getElementById(weightId).value;
  const price = document.getElementById(priceId).value;
  const amountInput = document.getElementById(amountId);
  
  if (weight && price) {
    const amount = (parseFloat(weight) * parseFloat(price)).toFixed(2);
    amountInput.value = amount;
  }
}

// 模拟登录
function login() {
  const account = document.getElementById('account').value;
  const password = document.getElementById('password').value;
  
  if (!account) {
    showToast('请输入账号');
    return;
  }
  
  if (!password) {
    showToast('请输入密码');
    return;
  }
  
  showLoading('登录中...');
  
  setTimeout(() => {
    hideLoading();
    showToast('登录成功');
    setTimeout(() => {
      navigateTo('home');
    }, 1500);
  }, 1000);
}

// 模拟提交订单
function submitOrder() {
  const customer = document.getElementById('customer').value;
  const phone = document.getElementById('phone').value;
  const category = document.getElementById('category').value;
  const weight = document.getElementById('weight').value;
  const unitPrice = document.getElementById('unitPrice').value;
  
  if (!customer) {
    showToast('请输入客户姓名');
    return;
  }
  
  if (!phone) {
    showToast('请输入联系电话');
    return;
  }
  
  if (!category) {
    showToast('请选择品类');
    return;
  }
  
  if (!weight) {
    showToast('请输入重量');
    return;
  }
  
  if (!unitPrice) {
    showToast('请输入单价');
    return;
  }
  
  showLoading('提交中...');
  
  setTimeout(() => {
    hideLoading();
    showToast('订单提交成功');
    setTimeout(() => {
      navigateTo('orders');
    }, 1500);
  }, 1500);
}

// 切换订单状态筛选
function setFilter(filter) {
  const filterItems = document.querySelectorAll('.filter-item');
  filterItems.forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`.filter-item[data-filter="${filter}"]`).classList.add('active');
  
  // 这里可以添加筛选逻辑
  showToast('筛选已更新');
}

// 选择品类
function selectCategory() {
  const select = document.getElementById('category');
  const selectedValue = select.value;
  const unitPriceInput = document.getElementById('unitPrice');
  
  // 根据品类设置默认单价
  const prices = {
    '大家电': 80,
    '小数码': 300,
    '小配件': 400,
    '其他': 20
  };
  
  if (prices[selectedValue]) {
    unitPriceInput.value = prices[selectedValue];
    calculateAmount('weight', 'unitPrice', 'amount');
  }
}

// 设置订单来源
function setSource(source) {
  const radioItems = document.querySelectorAll('.radio-item');
  radioItems.forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`.radio-item[data-source="${source}"]`).classList.add('active');
  
  // 显示或隐藏业务员字段
  const salesmanField = document.getElementById('salesman-field');
  if (salesmanField) {
    if (source === '业务员') {
      salesmanField.style.display = 'block';
    } else {
      salesmanField.style.display = 'none';
    }
  }
}

// 取消订单
function cancelOrder() {
  showModal('取消订单', '确定要取消这个订单吗？', '确定', '取消', () => {
    showLoading('处理中...');
    setTimeout(() => {
      hideLoading();
      showToast('订单已取消');
      // 这里可以更新订单状态
    }, 1000);
  });
}

// 完成订单
function completeOrder() {
  showModal('完成订单', '确定要完成这个订单吗？', '确定', '取消', () => {
    showLoading('处理中...');
    setTimeout(() => {
      hideLoading();
      showToast('订单已完成');
      // 这里可以更新订单状态
    }, 1000);
  });
}

// 打印订单
function printOrder() {
  showToast('打印功能开发中');
}

// 加载更多
function loadMore() {
  showLoading('加载中...');
  setTimeout(() => {
    hideLoading();
    showToast('没有更多数据了');
  }, 1000);
}

// 扫码功能
function scanCode() {
  showToast('扫码功能开发中');
}

// 注册功能
function goToRegister() {
  showToast('注册功能开发中');
}

// 忘记密码
function forgotPassword() {
  showToast('忘记密码功能开发中');
}

// 退出登录
function logout() {
  showModal('退出登录', '确定要退出登录吗？', '确定', '取消', () => {
    navigateTo('login');
  });
}