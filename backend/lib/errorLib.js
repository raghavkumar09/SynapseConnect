import moment from 'moment-timezone';

export const generateErrorMsg =(mrgName, err)=>{
  if(err.parent && err.parent.message) {
    if(err.parent.message.includes('Conversion failed')){
      err.message = "Invalid data type"
    }

    if(err.parent.message.includes('duplicate key')){
      err.message = "Required Unique Data"
    }

    if(err.parent.message.includes('Invalid column name')){
      err.message = "Invalid Column"
    }

    if(err.parent.message.includes('Unclosed quotation mark') || err.parent.message.includes('Incorrect syntax near')){
      err.message = "Invalid Query"
    }

    console.log({"Time:": moment().toISOString(),'MgrName':mrgName,  'error':err.parent.message, 'sql': err.parent.sql});
  } else {
    console.log({"Time:": moment().toISOString(),'MgrName':mrgName,  'error':err});
  }

  return err;
}