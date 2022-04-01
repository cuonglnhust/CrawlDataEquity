var ejs = require('ejs');
var path = require('path');
import { MidCustomer, MidDistributor } from '../models/middle'


const API_KEY = '37e9247e6b44d6e29c385c6c40c32b16-a65173b1-5577bf94';
const DOMAIN = 'kickcrm.net';
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

export const sendMailWithTemplate = (htmlStr, email, subject) => {
  return new Promise((resolve, reject) => {
    var data = {
      from: 'KickEnglish <admin@kickcrm.net>',
      to: email,
      subject: subject,
      html: htmlStr,
      text: 'xin chào!'
      
    };
    
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        return reject(error)
      }
      resolve(true)
    });
  })
}

export const sendMailActiveOrder = async (data) => {
  try {
    let dataEmail = {
      distributor: '',
      license_key: data.license_key,
      packageName: ''
    };

    const customerData = await MidCustomer.getCustomerByCondition({ id: data.userid });
    if (!customerData) {
      return;
    }

    if (data.distributor_id) {
      const distributorData = await MidDistributor.getDistributorById(data.distributor_id);
      dataEmail.distributor = distributorData || "";
    }

    if (data.package_id == 1) {
      dataEmail.packageName = 'VIP 1 THÁNG';
    } else if (data.package_id == 2) {
      dataEmail.packageName = 'VIP 3 THÁNG';
    } else if (data.package_id == 3) {
      dataEmail.packageName = 'VIP 1 NĂM';
    } else if (data.package_id == 4) {
      dataEmail.packageName = 'VIP TRỌN ĐỜI';
    }

    let pathFile = path.join(__dirname, '../views/email/activeOrder.ejs');
    ejs.renderFile(pathFile, dataEmail, function (err, html) {
      if (err) {
      } else {
        
        sendMailWithTemplate(html, customerData.email, 'KickEnglish Kích hoạt key');
      }
    });
  } catch (err) {
    console.log('++++++++++++++++', { err })
  }
}

export const sendMailForgotPassword = async (data) => {

  let dataEmail = {
    productName: "KickEnglish",
    name: data.name,
    email: data.email,
    hostVerify: data.hostVerify,
    hostWeb: data.hostWeb
  };
  
  let pathFile = path.join(__dirname, '../views/email/forgotPassword.ejs');

  ejs.renderFile(pathFile, dataEmail, function (err, html) {
    if (err) {
      console.log('++++++++++', err)
    }
    return sendMailWithTemplate(html, dataEmail.email, 'KickEnglish lấy lại mật khẩu');
  });
}
export const sendMailInfoPayment = async (data) => {

  let dataEmail = {
    distributor: '',
    productName: "KickEnglish",
    packageName: '',
    code: data.code,
    total_price: data.total_price,
    payinfo : data.payinfo
  };
  
  if (data.package_id == 1) {
    dataEmail.packageName = 'VIP 1 THÁNG';
  } else if (data.package_id == 2) {
    dataEmail.packageName = 'VIP 3 THÁNG';
  } else if (data.package_id == 3) {
    dataEmail.packageName = 'VIP 1 NĂM';
  } else if (data.package_id == 4) {
    dataEmail.packageName = 'VIP TRỌN ĐỜI';
  }
  
  if (data.distributor_id) {
    const distributorData = await MidDistributor.getDistributorById(data.distributor_id);
    dataEmail.distributor = distributorData || "";
  }
  const customerData = await MidCustomer.getCustomerByCondition({ id: data.userid });
  let pathFile = path.join(__dirname, '../views/email/OrderPayment.ejs');
  ejs.renderFile(pathFile, dataEmail, function (err, html) {
    if (err) {
      console.log('++++++++++', err)
    }
    return sendMailWithTemplate(html, customerData.email, 'KickEnglish thông tin chuyển khoản');
  });
}
export const sendMailInfoCustomer = async (data) => {

  let dataEmail = {
    distributor: '',
    title: data.title,
    content: data.content
  };
  if (data.distributor_id) {
    const distributorData =  await MidDistributor.getDistributorNameById(data.userDistributor_id) ;
    dataEmail.distributor = distributorData || "";
    
  }
  const customerData = await MidCustomer.getCustomerByCondition({ id: data.userid });
  let pathFile = path.join(__dirname, '../views/email/mailcustomer.ejs');

  ejs.renderFile(pathFile, dataEmail, function (err, html) {
    if (err) {
      console.log('++++++++++', err)
    }
    return sendMailWithTemplate(html, customerData.email, 'KickEnglish THÔNG BÁO!');
  });
}
export const sendMailInfoPaymentDistributor = async (data) => {

  let dataEmail = {
    distributor: '',
    productName: "KickEnglish",
    packageName: '',
    code: data.code,
    total_price: data.total_price,
    customer: '',
  };
  
  if (data.package_id == 1) {
    dataEmail.packageName = 'VIP 1 THÁNG';
  } else if (data.package_id == 2) {
    dataEmail.packageName = 'VIP 3 THÁNG';
  } else if (data.package_id == 3) {
    dataEmail.packageName = 'VIP 1 NĂM';
  } else if (data.package_id == 4) {
    dataEmail.packageName = 'VIP TRỌN ĐỜI';
  }

  let emailReceive = 'admin@kickcrm.net'; 
  
  if (data.distributor_id) {
    var distributorData = await MidDistributor.getDistributorById(data.distributor_id);
    dataEmail.distributor = distributorData || "";
    emailReceive = distributorData ? distributorData.email : emailReceive;
  }
  if (data.userid) {
    const customerData = await MidCustomer.getCustomerByCondition({ id: data.userid });
    dataEmail.customer = customerData || "";
  }
 
  let pathFile = path.join(__dirname, '../views/email/maildistributorOrder.ejs');
  ejs.renderFile(pathFile, dataEmail, function (err, html) {
    if (err) {
      console.log('++++++++++', err)
    }
    return sendMailWithTemplate(html, emailReceive, 'KickEnglish thông tin đơn hàng');
  });
}

